(function() {
  'use strict';

  angular.module('app').directive('autoFocus', createAutoFocusDirective);

  createAutoFocusDirective.$inject = ['$timeout'];

  function createAutoFocusDirective($timeout) {
    return {
      restrict: 'AC',
      link: link
    };

    function link(_scope, _element) {
      $timeout(function() {
        _element[0].focus();
      }, 0);
    }
  }
}());
