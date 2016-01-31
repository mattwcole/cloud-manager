'use strict';

module.exports = {
  port: process.env.PORT || 3915,
  secret: process.env.SECRET,
  appUsername: process.env.USERNAME,
  appPassword: process.env.PASSWORD,
  jwtTimeout: 20 * 60 * 1000,
  livereload: false,
  sslOnly: false,
  aws: {
    apiVersion: '2015-12-20',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    guestRoleArn: process.env.AWS_GUEST_ROLE_ARN,
    adminRoleArn: process.env.AWS_ADMIN_ROLE_ARN,
    sqsQueueUrl: process.env.AWS_SQS_QUEUE_URL
  },
  chef: {
    serverUrl: process.env.CHEF_SERVER_URL,
    clientName: process.env.CHEF_CLIENT_NAME,
    clientKey: process.env.CHEF_CLIENT_KEY
  },
  assets: {
    client: {
      lib: {
        js: [
          'public/lib/angular/angular.js',
          'public/lib/angular-ui-router/release/angular-ui-router.js',
          'public/lib/angular-animate/angular-animate.js',
          'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
          'public/lib/angular-jwt/dist/angular-jwt.js',
          'public/lib/angular-socket-io/socket.js',
          'public/lib/ngstorage/ngStorage.js',
          'public/lib/aws-sdk/dist/aws-sdk.js',
          'public/lib/lodash/dist/lodash.js'
        ],
        css: [
          'public/lib/bootswatch-dist/css/bootstrap.css',
          'public/lib/animate.css/animate.css',
          'public/lib/font-awesome/css/font-awesome.css'
        ]
      },
      js: ['public/js/app.js', 'public/js/**/*.js', 'public/dist/cm-config.js'],
      css: 'public/css/main.css',
      views: 'public/views/*.html',
      favicon: 'public/favicon.ico'
    },
    server: {
      js: ['server.js', 'app/**/*.js', 'config/**/*.js'],
      views: 'app/views/*.hbs',
      routes: 'app/routes/*.js'
    }
  },
  client: {
    aws: {
      apiVersion: '2015-12-20',
      region: process.env.AWS_REGION,
      s3Url: process.env.AWS_S3_URL,
      templatesBucket: process.env.AWS_TEMPLATES_BUCKET,
      snsTopicArn: process.env.AWS_SNS_TOPIC_ARN
    }
  }
};
