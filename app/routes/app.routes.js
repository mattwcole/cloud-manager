'use strict';

var controller = require('../controllers/app.controller');

module.exports = configureRoutes;

function configureRoutes(app) {
  app.route('/').get(controller.renderIndex);
};
