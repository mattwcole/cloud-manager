(function() {
  'use strict';

  angular.module('app').factory('AwsCredentials', awsCredentialsConstructorFactory);

  awsCredentialsConstructorFactory.$inject = ['$http'];

  function awsCredentialsConstructorFactory($http) {
    AwsCredentials.prototype = new AWS.Credentials();
    AwsCredentials.prototype.loadCredentials = loadCredentials;

    return AwsCredentials;

    function AwsCredentials() {
      var _this = this;
      AWS.Credentials.call(_this);

      _this.refresh = function(callback) {
        $http.get('/api/credentials').then(
          function success(response) {
            _this.loadCredentials(response.data.Credentials);
            callback();
          },
          function error(err) {
            callback(err);
          }
        );
      }
    }

    function loadCredentials(credentials) {
      var _this = this;

      if (credentials) {
        _this.accessKeyId = credentials.AccessKeyId;
        _this.secretAccessKey = credentials.SecretAccessKey;
        _this.sessionToken = credentials.SessionToken;
        _this.expireTime = credentials.Expiration;
      }
    }
  }
}());
