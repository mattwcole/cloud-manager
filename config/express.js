'use strict';

var express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  consolidate = require('consolidate'),
  passport = require('passport'),
  strategy = require('./passport-strategies/single-user'),
  config = require('./config');

// TODO: Error handling and 404s.

module.exports = configureExpress;

function configureExpress() {
  var app = express();

  passport.use(strategy);
  app.use(passport.initialize());

  app.engine('hbs', consolidate.handlebars);
  app.set('view engine', 'hbs');
  app.set('views', './app/views');

  app.use(bodyParser.json());

  app.locals.favicon = config.assets.client.favicon;
  app.locals.jsFiles = config.getClientJsFiles();
  app.locals.cssFiles = config.getCssFiles();
  app.locals.livereload = config.livereload;

  app.use('/public', express.static('public'));

  config.getRoutes().forEach(function(route) {
    require('../' + route)(app);
  });

  return http.createServer(app);
}
