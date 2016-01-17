'use strict';

var aws = require('aws-sdk'),
  config = require('./config');

module.exports = configureAws;

function configureAws() {
  aws.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
    apiVersion: config.aws.apiVersion
  });
}
