'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('App', [
  'ui.router',
  'ui.bootstrap',
  'defaultLayout',
  'loginLayout',
  'login',
  'home'
])
.config(function($stateProvider) {
 
  //Login
  $stateProvider.state('defaultLayout', {
	url: "/defaultLayout",
	abstract: true,
    templateUrl: 'views/layout/defaultLayout.html',
	controller: 'defaultLayoutController'
  })
  .state('loginLayout', {
	url: "/loginLayout",
	abstract: true,
    templateUrl: 'views/layout/loginLayout.html',
	controller: 'loginLayoutController'
  });  
})
.config(function($urlRouterProvider, $httpProvider) {
  //session check and redirect to specific state
  if(!window.sessionStorage["userInfo"]){
	$urlRouterProvider.otherwise("/loginLayout/login");  
  }else{
	$urlRouterProvider.otherwise("/defaultLayout/home");  
  }
    
})
.run(function($rootScope, $state) {
	$rootScope.$state = $state; //Get state info in view
	
	if(window.sessionStorage["userInfo"]){
		$rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
	}
	
	//Check session and redirect to specific page
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if(toState && toState.data && toState.data.auth && !window.sessionStorage["userInfo"]){
			event.preventDefault();
			$state.go('loginLayout.login');
		}		
		
		if(!toState && !toState.data && !toState.data.auth && window.sessionStorage["userInfo"]){
			event.preventDefault();
			$state.go('defaultLayout.home');
		}
	});
});
