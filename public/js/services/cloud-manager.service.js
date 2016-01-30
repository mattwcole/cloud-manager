(function() {
  'use strict';

  angular.module('app').factory('cloudManager', createCloudManager);

  createCloudManager.$inject = ['$q', 'awsService', 'Server', 'config'];

  function createCloudManager($q, awsService, Server, config) {
    var templatesBucketUrl = config.aws.s3Url + '/' + config.aws.templatesBucket;

    return {
      listServers: listServers,
      createServer: createServer,
      deleteServer: deleteServer
    };

    function listServers() {
      return $q.all([getStackTemplateNames(), getStacks()]).then(
        function success(result) {
          var stackNames = result[0];
          var stacks = result[1];

          return _.map(stackNames, function(name) {
            var stack = _.find(stacks, function(s) {return s.StackName === name});

            return new Server(name, stack);
          });
        }
      );
    }

    function createServer(name) {
      return getSnapshotForStack(name).then(
        function success(snapshot) {
          var params = {
            StackName: name,
            TemplateURL: templatesBucketUrl + '/' + name + '.json',
            NotificationARNs: [config.aws.snsTopicArn],
            Parameters: snapshot && [
              {
                ParameterKey: 'DataVolumeSnapshotId',
                ParameterValue: snapshot.SnapshotId
              }
            ]
          };

          return awsService.createStack(params);
        }
      );
    }

    function deleteServer(name) {
      var params = {
        StackName: name
      };
      return awsService.deleteStack(params);
    }

    function getStackTemplateNames() {
      var params = {
        Bucket: config.aws.templatesBucket
      };

      return awsService.listObjects(params).then(
        function success(data) {
          return _.map(data.Contents, function(template) {
            return _.trimEnd(template.Key, '.json');
          });
        }
      );
    }

    function getSnapshotForStack(stackName) {
      var params = {
        Filters: [
          {
            Name: 'tag:aws:cloudformation:stack-name',
            Values: [stackName]
          }
        ]
      };

      return awsService.describeSnapshots(params).then(
        function success(data) {
          var snapshots = _.sortBy(data.Snapshots, function(s) {return s.StartTime});
          return _.first(snapshots);
        }
      );
    }

    function getStacks() {
      return awsService.describeStacks().then(
        function success(data) {
          return data.Stacks;
        }
      );
    }
  }
}());
