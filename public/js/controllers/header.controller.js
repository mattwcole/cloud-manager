(function() {
  'use strict';

  angular.module('app').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'tokenStore', 'loginService'];

  function HeaderController($state, tokenStore, loginService) {
    var vm = this;

    vm.isAuthenticated = tokenStore.hasToken;
    vm.logout = loginService.logout;
  }
}());
