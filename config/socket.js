'use strict';

var config = require('./config'),
  socketio = require('socket.io'),
  socketioJwt = require('socketio-jwt');

module.exports = configureSocketio;

function configureSocketio(server) {
  var io = socketio(server);

  io.on('connect', socketioJwt.authorize({
    secret: config.secret
  }))
  .on('authenticated', function(socket) {
    socket.join('admin');
	});

  return io;
}
