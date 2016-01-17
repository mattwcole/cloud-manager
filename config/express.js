'use strict';

var express = require('express'),
  http = require('http'),
  sslify = require('express-sslify'),
  bodyParser = require('body-parser'),
  consolidate = require('consolidate'),
  passport = require('passport'),
  strategy = require('./passport-strategies/single-user'),
  config = require('./config');

// TODO: Error handling and 404s.

module.exports = configureExpress;

function configureExpress() {
  var app = express();

  configureSsl(app);

  passport.use(strategy);
  app.use(passport.initialize());

  configureViewEngine(app);

  app.use(bodyParser.json());

  configureLocals(app);

  app.use('/public', express.static('public'));

  config.getRoutes().forEach(function(route) {
    require('../' + route)(app);
  });

  return http.createServer(app);
}

function configureSsl(app) {
  if (config.sslOnly) {
    app.use(sslify.HTTPS({  // eslint-disable-line new-cap
      trustProtoHeader: true
    }));
  }
}

function configureViewEngine(app) {
  app.engine('hbs', consolidate.handlebars);
  app.set('view engine', 'hbs');
  app.set('views', './app/views');
}

function configureLocals(app) {
  app.locals.favicon = config.assets.client.favicon;
  app.locals.jsFiles = config.getClientJsFiles();
  app.locals.cssFiles = config.getCssFiles();
  app.locals.livereload = config.livereload;
}
