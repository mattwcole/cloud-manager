'use strict';

var passport = require('passport'),
  controller = require('../controllers/auth.controller');

module.exports = configureRoutes;

function configureRoutes(app) {
  app.route('/login').post(
    passport.authenticate('local', {session: false}),
    controller.login
  );
}
