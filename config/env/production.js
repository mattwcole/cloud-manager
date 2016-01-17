'use strict';

// TODO: Create custom builds of some components.

module.exports = {
  assets: {
    client: {
      lib: {
        js: [
          'public/lib/angular/angular.min.js',
          'public/lib/angular-ui-router/release/angular-ui-router.min.js',
          'public/lib/angular-animate/angular-animate.min.js',
          'public/lib/angular-bootstrap/ui-bootstrap.min.js',
          'public/lib/angular-jwt/dist/angular-jwt.min.js',
          'public/lib/angular-socket-io/socket.min.js',
          'public/lib/ngstorage/ngStorage.min.js',
          'public/lib/aws-sdk/dist/aws-sdk.min.js',
          'public/lib/lodash/lodash.min.js'
        ],
        css: [
          'public/lib/bootswatch-dist/css/bootstrap.min.css',
          'public/lib/animate.css/animate.min.css',
          'public/lib/font-awesome/css/font-awesome.min.css'
        ]
      },
      js: 'public/dist/app.min.js',
      css: 'public/dist/app.min.css'
    }
  }
};
