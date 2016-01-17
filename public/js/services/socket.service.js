(function() {
  'use strict';

  angular.module('app').factory('socket', createSocket);

  createSocket.$inject = ['socketFactory', 'tokenStore', 'authService'];

  function createSocket(socketFactory, tokenStore, authService) {
    var socket;

    return {
      connect: connect,
      disconnect: disconnect,
      subscribe: subscribe
    }

    function connect() {
      if (socket) {
        socket.connect();
      } else {
        tryCreateConnectedSocket();
      }
    }

    function disconnect() {
      socket && socket.disconnect.apply(socket, arguments);
    }

    function subscribe($scope, eventName, callback) {
      if (socket || tryCreateConnectedSocket()) {

        socket.forward(eventName, $scope);
        $scope.$on('socket:' + eventName, callback);
      }
    }

    function tryCreateConnectedSocket() {
      var isAuthenticated = authService.authCheck();

      if (isAuthenticated) {
        socket = socketFactory();
        socket.on('connect', function() {
          socket.emit('authenticate', {token: tokenStore.getToken()});
        });
      }

      return isAuthenticated;
    }
  }
}());
