(function() {
  'use strict';

  angular.module('app').constant('aws', AWS);

  angular.module('app').factory('awsService', createAwsService);

  createAwsService.$inject = ['aws', 'AwsCredentials', 'config', '$q', '$http'];

  function createAwsService(aws, AwsCredentials, config, $q, $http) {
    var ec2, s3;

    initialise();

    return {
      clearCredentials: initialise,
      describeInstances: describeInstances,
      describeSnapshots: describeSnapshots,
      describeStacks: describeStacks,
      createStack: createStack,
      deleteStack: deleteStack,
      listObjects: listObjects
    };

    function initialise() {
      aws.config.credentials = new AwsCredentials();
      aws.config.apiVersion = config.aws.apiVersion;
      aws.config.region = config.aws.region;
      ec2 = new aws.EC2();
      s3 = new aws.S3();
    }

    function describeInstances(params) {
      return promise(ec2, ec2.describeInstances, params);
    }

    function describeSnapshots(params) {
      return promise(ec2, ec2.describeSnapshots, params);
    }

    function listObjects(params) {
      return promise(s3, s3.listObjects, params);
    }

    // The CloudFormation SDK does not currently support CORS so
    // requests are proxied through the server. SDKs with CORS support
    // are marked with a globe icon in the SDK builder.
    // https://sdk.amazonaws.com/builder/js/

    function describeStacks(params) {
      return $http.post('/api/describe-stacks', params).then(
        function(response) {
          return response.data;
        }
      );
    }

    function createStack(params) {
      return $http.post('/api/create-stack', params).then(
        function(response) {
          return response.data;
        }
      );
    }

    function deleteStack(params) {
      return $http.post('/api/delete-stack', params).then(
        function (response) {
          return response.data;
        }
      );
    }

    function promise(awsService, awsFunction, params) {
      var deferred = $q.defer();

      awsFunction.call(awsService, params, function(err, data) {
        return err
          ? deferred.reject(err)
          : deferred.resolve(data);
      });

      return deferred.promise;
    }
  }
}());
