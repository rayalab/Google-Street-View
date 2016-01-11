'use strict';
angular.module('login', []);

//Routers
App.config(function($stateProvider) {
 
  //Login
  $stateProvider.state('loginLayout.login', {
	url: "/login",
	controller: 'loginController',
	views: {
        'middle': {
            templateUrl: 'views/security/views/login.html'
        }
    }
  });  
})
.controller('loginController', ['$scope', 'loginServices', '$location', '$rootScope', '$state', function($scope, loginServices, $location, $rootScope, $state) {
	console.log("hola");
	$scope.login = {"email":"mail2asik@gmail.com", "password": "mypassword"};

	$scope.doLogin = function() {

		if ($scope.loginForm.$valid) {	
			loginServices.login($scope.login).then(function(result){
				$scope.data = result;
				if (!result.error) {
				  window.sessionStorage["userInfo"] = JSON.stringify(result.data);
				  $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
				  $state.go('defaultLayout.dashboard');
				}
			});	
		}
	};
}])
.controller('signupController', ['$scope', 'loginServices', '$location', function($scope, loginServices, $location) {
	$scope.doSignup = function() {
		if ($scope.signupForm.$valid) {	
			loginServices.signup($scope.signup).then(function(result){
				$scope.data = result;
				if (!result.error) {	
					$location.path("/login");
				}	
			});	
		}
	}
}])
.controller('logoutController', ['$scope', '$location', '$rootScope', '$state', function($scope, $location, $rootScope, $state) {
	$scope.logOut = function() {

			sessionStorage.clear();
			$rootScope.userInfo = false;
			$state.go('loginLayout.login');
	};
}]);