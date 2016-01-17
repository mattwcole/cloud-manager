'use strict';

var expressJwt = require('express-jwt'),
  config = require('../../config/config'),
  controller = require('../controllers/api.controller');

// Consider using an express.Router.
// http://expressjs.com/en/guide/routing.html

module.exports = configureRoutes;

function configureRoutes(app) {
  app.all('/api/*', expressJwt({secret: config.secret}));

  app.route('/api/credentials').get(
    controller.assumeRole
  );

  app.route('/api/describe-stacks').post(
    controller.describeStacks
  );

  app.route('/api/create-stack').post(
    controller.createStack
  );

  app.route('/api/delete-stack').post(
    controller.deleteStack
  );
}
