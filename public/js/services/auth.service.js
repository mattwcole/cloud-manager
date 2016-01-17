(function() {
  'use strict';

  angular.module('app').factory('authService', createAuthService);

  createAuthService.$inject = ['$rootScope', '$injector', '$q', 'tokenStore'];

  function createAuthService($rootScope, $injector, $q, tokenStore) {
    return {
      initialise: registerAuthCheckOnStateChange,
      authCheck: authCheck
    };

    function registerAuthCheckOnStateChange() {
      $rootScope.$on('$stateChangeStart', checkState);  // eslint-disable-line angular/on-watch

      function checkState(event, toState) {
        var isAdminState = toState && toState.data && toState.data.admin;

        if (isAdminState && !authCheck()) {
          event.preventDefault();
        }
      }
    }

    function authCheck() {
      var hasToken = tokenStore.hasToken();
      if (!hasToken) {
        $injector.get('loginService').logout();
      }
      return hasToken;
    }
  }
}());
