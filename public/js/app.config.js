(function() {
  'use strict';

  angular.module('app').config(configureApp);

  configureApp.$inject = [
    '$stateProvider', '$urlRouterProvider', '$httpProvider'
  ];

  function configureApp($stateProvider, $urlRouterProvider, $httpProvider) {
    configureRoutes($urlRouterProvider, $stateProvider);
    configureHttp($httpProvider);
  }

  function configureRoutes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/not-found');

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'public/views/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      data: {
        admin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'public/views/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'public/views/about.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'public/views/not-found.html'
    });
  }

  function configureHttp($httpProvider) {
    $httpProvider.interceptors.push('httpAuthInterceptor');
    $httpProvider.useLegacyPromiseExtensions = false;
  }
}());
