(function() {
  'use strict';

  angular.module('app').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'cloudManager', 'socket'];

  function HomeController($scope, awsCloudManager, socket) {
    var vm = this;

    vm.servers = [];
    vm.loadingServers = false;

    socket.subscribe($scope, 'cfn-message', onMessage);
    loadServers();

    function loadServers() {
      vm.loadingServers = true;

      awsCloudManager.listServers().then(
        function success(servers) {
          vm.loadingServers = false;
          vm.servers = servers;
        },
        function error(err) {
          vm.loadingServers = false;
          vm.alert = {
            title: 'Failed to load servers',
            type: 'danger',
            message: err.message
          }
        }
      );
    }

    function onMessage(event, data) {
      var message = extractMessage(angular.fromJson(data).Message);

      var server = _.find(vm.servers, {name: message.StackName});
      if (server) {
        server.update(message);
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
  }
}());
