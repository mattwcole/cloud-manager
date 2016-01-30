'use strict';

var async = require('async'),
  config = require('../../config/config'),
  ChefApi = require('chef-api');

var chef = createChefClient();

module.exports = createWorker;

function createChefClient() {
  var options = {
    url: config.chef.serverUrl,
    client_name: config.chef.clientName,  // eslint-disable-line camelcase
    key: config.chef.clientKey
  };

  var chef = new ChefApi();
  chef.config(options);

  return chef;
}

function createWorker(io) {
  return {
    handleMessage: handleMessage
  };

  function handleMessage(data, done) {
    // TODO: Consider formatting message before broadcasting.
    io.to('admin').emit('cfn-message', data.Body);

    var message = extractMessage(JSON.parse(data.Body).Message);
    if (message.ResourceType === 'AWS::EC2::Instance'
      && message.ResourceStatus === 'DELETE_IN_PROGRESS') {

      cleanupChef(message.StackName, done);
    } else {
      done();
    }
  }

  function extractMessage(messageData) {
    var kvpRegex = /(\S+?)='(.*?)'+/g;
    var message = {};
    var matches;

    while ((matches = kvpRegex.exec(messageData))) {
      message[matches[1]] = matches[2];
    }

    return message;
  }

  function cleanupChef(nodeName, done) {
    async.parallel([deleteNode, deleteClient], done);

    function deleteNode(callback) {
      chef.deleteNode(nodeName, function(err) {
        var notFoundMessage = 'Received status code: 404 - node \'' +
          nodeName + '\' not found';

        return err && err.message !== notFoundMessage
          ? callback(err)
          : callback();
      });
    }

    function deleteClient(callback) {
      chef.deleteClient(nodeName, function(err) {
        var notFoundMessage = 'Received status code: 404 -' +
          ' Cannot load client ' + nodeName;

        return err && err.message !== notFoundMessage
          ? callback(err)
          : callback();
      });
    }
  }
}
