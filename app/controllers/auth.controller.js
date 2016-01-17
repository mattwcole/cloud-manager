'use strict';

var jwt = require('jsonwebtoken'),
  config = require('../../config/config');

module.exports = {
  login: login
};

function login(req, res) {
  var token = jwt.sign(req.user, config.secret, {
    expiresIn: config.jwtTimeout.toString()
  });

  res.json({
    user: req.user,
    token: token
  });
};
