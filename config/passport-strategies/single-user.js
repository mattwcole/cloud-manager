'use strict';

var config = require('../config'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(verifyUser);

function verifyUser(username, password, done) {
  if (username !== config.appUsername || password !== config.appPassword) {
    return done(null, false);
  }

  var user = {
    username: username
  };

  done(null, user);
}
