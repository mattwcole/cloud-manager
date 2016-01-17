(function() {
  'use strict';

  angular.module('app').controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$state', 'loginService'];

  function LoginController($http, $state, loginService) {
    var vm = this;

    vm.login = login;

    function login() {
      loginService.login(vm.username, vm.password).then(
        null,
        function error(err) {
          vm.alert = {
            title: 'Error',
            type: 'danger',
            message: err.data
          }
        }
      );
    }
  }
}());
