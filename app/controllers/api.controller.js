'use strict';

var aws = require('aws-sdk'),
  config = require('../../config/config');

var sts = new aws.STS();
var cloudFormation = new aws.CloudFormation();

module.exports = {
  assumeRole: assumeRole,
  describeStacks: describeStacks,
  createStack: createStack,
  deleteStack: deleteStack
};

function assumeRole(req, res, next) {
  var params = {
    RoleArn: config.aws.adminRoleArn,
    RoleSessionName: 'cloud-manager-admin-' + req.user.username
  };

  sts.assumeRole(params, function(err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
};

function describeStacks(req, res, next) {
  cloudFormation.describeStacks(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
};

function createStack(req, res, next) {
  cloudFormation.createStack(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
}

function deleteStack(req, res, next) {
  cloudFormation.deleteStack(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
}
