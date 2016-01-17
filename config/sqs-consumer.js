'use strict';

var config = require('./config'),
  sqs = require('sqs-consumer');

module.exports = configureSqsConsumer;

function configureSqsConsumer(io) {
  return sqs.create({
    region: config.aws.region,
    queueUrl: config.aws.sqsQueueUrl,
    handleMessage: handleMessage
  });

  function handleMessage(message, done) {
    io.to('admin').emit('cf-notification', message.Body);
    done();
  }
}
