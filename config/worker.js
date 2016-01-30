'use strict';

var config = require('./config'),
  sqs = require('sqs-consumer'),
  cloudformationWorker = require('../app/workers/cloudformation.worker');

module.exports = createWorker;

function createWorker(io) {
  var worker = cloudformationWorker(io);

  return sqs.create({
    region: config.aws.region,
    queueUrl: config.aws.sqsQueueUrl,
    handleMessage: worker.handleMessage
  });
}
