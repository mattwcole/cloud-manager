(function() {
  'use strict';

  angular.module('app').factory('httpAuthInterceptor', createHttpAuthInterceptor);

  createHttpAuthInterceptor.$inject = ['$q', 'tokenStore', 'authService'];

  function createHttpAuthInterceptor($q, tokenStore, authService) {
    return {
      request: authroiseHttpRequest
    };

    function authroiseHttpRequest(config) {
      if (config.url.startsWith('/api')) {
        if (authService.authCheck()) {
          config.headers['Authorization'] = 'Bearer ' + tokenStore.getToken();
        } else {
          return $q.reject(new Error('Not logged in'));
        }
      }

      return config;
    }
  }
}());
