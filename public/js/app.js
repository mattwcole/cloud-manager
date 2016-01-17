(function() {
  'use strict';

  angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'angular-jwt',
    'ngStorage',
    'btford.socket-io',
    'cm-config'
  ]);

  angular.module('app').run(initialise);

  initialise.$inject = ['authService'];

  function initialise(authService) {
    authService.initialise();
  }
}());
