(function() {
  'use strict';

  angular.module('app').factory('tokenStore', createTokenStore);

  createTokenStore.$inject = ['$localStorage', 'jwtHelper'];

  function createTokenStore($localStorage, jwtHelper) {
    return {
      setToken: setToken,
      getToken: getToken,
      clearToken: clearToken,
      hasToken: hasToken
    };

    function setToken(token) {
      $localStorage.token = token;
    }

    function getToken() {
      var token = $localStorage.token;

      if (token && jwtHelper.isTokenExpired(token)) {
        clearToken();
        return null;
      }

      return token;
    }

    function clearToken() {
      delete $localStorage.token;
    }

    function hasToken() {
      return !!getToken();
    }
  }
}());
