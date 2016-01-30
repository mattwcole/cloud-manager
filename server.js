'use strict';

var config = require('./config/config'),
  configureAws = require('./config/aws'),
  configureExpress = require('./config/express'),
  configureSocket = require('./config/socket'),
  configureWorker = require('./config/worker');

// TODO: Logging.

configureAws();
var server = configureExpress();
var io = configureSocket(server);
var worker = configureWorker(io);

process.on('SIGINT', function() {
  worker.stop();
  io.close();

  server.close(function() {
    console.log('Stopped server.');
    process.exit();
  });
});

worker.start();

server.listen(config.port, function() {
  console.log('Started server on port %s.', server.address().port);
});
