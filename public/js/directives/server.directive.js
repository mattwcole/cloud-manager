(function() {
  'use strict';

  angular.module('app').directive('cmServer', createServerDirective);

  createServerDirective.$inject = ['cloudManager'];

  function createServerDirective(cloudManager) {
    return {
      restrict: 'E',
      templateUrl: '/public/views/server.html',
      controllerAs: 'vm',
      bindToController: {
        server: '='
      },
      controller: ServerController,
      scope: {}
    }

    function ServerController() {
      var vm = this;

      vm.createServer = createServer;
      vm.deleteServer = deleteServer;
      vm.isBusy = isBusy;
      vm.canCreate = canCreate;
      vm.canDelete = canDelete;
      vm.getStatusColour = getStatusColour;

      function createServer() {
        cloudManager.createServer(vm.server.name).then(
          null,
          function error(err) {
            vm.alert = {
              title: 'Failed to trigger server creation',
              type: 'danger',
              message: err.data
            }
          }
        );
      }

      function deleteServer() {
        cloudManager.deleteServer(vm.server.name).then(
          null,
          function error(err) {
            vm.alert = {
              title: 'Failed to trigger server deletion',
              type: 'danger',
              message: err.data
            }
          }
        );
      }

      function isBusy() {
        return !_.includes(idleStates, vm.server.status);
      }

      function canCreate() {
        return !isBusy() && _.includes(deletedStates, vm.server.status)
      }

      function canDelete() {
        return !isBusy() && !_.includes(deletedStates, vm.server.status)
      }

      function getStatusColour() {
        if (vm.server.status == 'OFFLINE'){
          return 'default';
        }
        if (_.includes(successStates, vm.server.status)) {
          return 'success';
        }
        if (_.includes(errorStates, vm.server.status)) {
          return 'danger';
        }
        return 'info';
      }

      var successStates = [
        'CREATE_COMPLETE',
        'DELETE_COMPLETE',
        'UPDATE_COMPLETE'
      ];
      var errorStates = [
        'CREATE_FAILED',
        'DELETE_FAILED',
        'ROLLBACK_IN_PROGRESS',
        'ROLLBACK_COMPLETE',
        'ROLLBACK_FAILED',
        'UPDATE_ROLLBACK_IN_PROGRESS',
        'UPDATE_ROLLBACK_COMPLETE',
        'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS',
        'UPDATE_ROLLBACK_FAILED'
      ];
      var idleStates = [
        'OFFLINE',
        'CREATE_COMPLETE',
        'DELETE_COMPLETE',
        'UPDATE_COMPLETE',
        'ROLLBACK_COMPLETE',
        'UPDATE_ROLLBACK_COMPLETE'
      ];
      var deletedStates = [
        'OFFLINE',
        'DELETE_COMPLETE'
      ];
    }
  }
}());
