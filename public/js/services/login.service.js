(function() {
  'use strict';

  angular.module('app').factory('loginService', createLoginService);

  createLoginService.$inject = ['$state', '$http', 'tokenStore', 'awsService', 'socket']

  function createLoginService($state, $http, tokenStore, awsService, socket) {
    return {
      login: login,
      logout: logout
    };

    function login(username, password) {
      var user = {
        username: username,
        password: password
      };

      return $http.post('/login', user).then(
        function success(res) {
          var token = res.data.token;

          tokenStore.setToken(token);
          socket.connect();
          $state.go('home');
        }
      );
    }

    function logout() {
      tokenStore.clearToken();
      awsService.clearCredentials();
      socket.disconnect();
      $state.go('login');
    }
  }
}());
