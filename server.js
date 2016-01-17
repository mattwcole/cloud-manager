'use strict';

var config = require('./config/config'),
  configureAws = require('./config/aws'),
  configureExpress = require('./config/express'),
  configureSocket = require('./config/socket'),
  configureSqsConsumer = require('./config/sqs-consumer');

// TODO: Logging.

configureAws();
var server = configureExpress();
var io = configureSocket(server);
var sqsConsumer = configureSqsConsumer(io);

process.on('SIGINT', function() {
  sqsConsumer.stop();
  io.close();

  server.close(function() {
    console.log('Stopped server.');
    process.exit();
  });
});

sqsConsumer.start();

server.listen(config.port, function() {
  console.log('Started server on port %s.', server.address().port);
});
