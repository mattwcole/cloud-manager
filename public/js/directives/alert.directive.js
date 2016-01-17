(function() {
  'use strict';

  angular.module('app').directive('cmAlert', createCmAlertDirective);

  function createCmAlertDirective() {
    return {
      restrict: 'E',
      templateUrl: 'public/views/alert.html',
      controllerAs: 'vm',
      bindToController: {
        alert: '=alertBody'
      },
      controller: AlertController,
      scope: {}
    };
  }

  function AlertController() {
    var vm = this;

    vm.showAlert = showAlert;
    vm.alertType = alertType;
    vm.closeAlert = closeAlert;

    function alertType() {
      return vm.alert.type || 'warn';
    }

    function showAlert() {
      return !!vm.alert;
    }

    function closeAlert() {
      vm.alert = null;
    }
  }
}());

