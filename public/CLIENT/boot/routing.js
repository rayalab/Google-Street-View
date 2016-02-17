/**
 * Angular UI-Routing
 */
angular.module('layouts')

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

 	$urlRouterProvider.otherwise('/home');

   $stateProvider
    .state('default', {
      url: "/default",
      abstract: true,
      templateUrl: "layouts/default/layout.html",
      controller: "layout.default"
    })
    .state('login', {
      url: "/login",
      abstract: true,
      templateUrl: "layouts/login/layout.html",
      controller: "layout.login"
    })
    .state('oauth', {
      url: "/oauth",
      templateUrl: 'modules/auth/views/login.html',
      controller: "auth.login"
    })
    .state('home', {
      url: '/home',
      templateUrl: 'modules/home/views/index.html',
      controller: 'home.index'
    })
    .state('end', {
      url: '/end',
      templateUrl: 'modules/end/views/index.html',
      controller: 'end.index'
    })
 
}]);