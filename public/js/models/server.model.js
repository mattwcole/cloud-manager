(function() {
  'use strict';

  angular.module('app').factory('Server', createServerConstructor);

  function createServerConstructor() {
    Server.prototype.update = update;

    return Server;

    function Server(name, stack) {
      var _this = this;

      _this.name = name;
      _this.status = 'OFFLINE';

      if (stack) {
        _this.status = stack.StackStatus;
        _this.description = stack.Description;
      }
    }

    function update(message) {
      var _this = this;

      _this.status = message.ResourceStatus;
    }
  }
}());
