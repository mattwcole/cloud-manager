'use strict';

var defaultConfig = require('./env/default'),
  _ = require('lodash'),
  glob = require('glob');

module.exports = loadConfig();

function loadConfig(config) {
  config = config || {};

  mergeConfig(config, defaultConfig);
  mergeEnvironmentConfig(config);
  mergeLocalConfig(config);
  attachHelpers(config);

  return config;
};

function mergeEnvironmentConfig(config) {
  var env = process.env.NODE_ENV;

  if (env) {
    var environmentConfig = require('./env/' + env);
    mergeConfig(config, environmentConfig);
  }
}

function mergeLocalConfig(config) {
  try {
    var localConfig = require('./env/local');
    mergeConfig(config, localConfig);
  } catch (err) {
    if (!(err instanceof Error && err.code === 'MODULE_NOT_FOUND')) {
      throw err;
    }
  }
}

function mergeConfig(destinationConfig, sourceConfig) {
  _.merge(destinationConfig, sourceConfig, function(prev, next) {
    if (_.isArray(next)) {
      return next;
    }
  });
}

function attachHelpers(config) {
  config.getClientJsFiles = getClientJsFiles;
  config.getCssFiles = getCssFiles;
  config.getRoutes = getRoutes;
  config.reload = reload;
}

function getClientJsFiles() {
  var _this = this;

  return getGlobbedPaths(
    _this.assets.client.lib.js,
    _this.assets.client.js
  );
};

function getCssFiles() {
  var _this = this;

  return getGlobbedPaths(
    _this.assets.client.lib.css,
    _this.assets.client.css
  );
};

function getRoutes() {
  var _this = this;

  return getGlobbedPaths(_this.assets.server.routes);
};

function reload() {
  var _this = this;

  for (var member in _this) {
    delete _this[member];
  }

  loadConfig(_this);
}

function getGlobbedPaths() {
  var urlRegex = /^https?:\/\//i;
  var patterns = _.flatten(arguments);

  var files = _.map(patterns, function(pattern) {
    return urlRegex.test(pattern)
      ? [pattern]
      : glob.sync(pattern);
  });

  return _.union.apply(_, files);
};
