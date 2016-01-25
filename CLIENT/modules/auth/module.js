angular.module('app')

.controller('auth.login', function authLogin($stateParams, $flash, $scope, $oauth) {
	console.log(localStorage);
	$scope.userData = {};

	// send auth login
	$scope.sendPost = function() {
		$oauth.login();
		//$auth.login($scope.userData);
	};

	// Check google login
	if ($stateParams.opt1 === 'googleFail') {
		$flash.setMessage('Your google account was not found on our server');
	}

})

.controller('auth.signup', function authSignup($rootScope, $scope, $flash, $oauth, User) {

	$scope.userData = {};

	$scope.signup = function() {
		User.create($scope.userData,
			function() {
				$auth.login($scope.userData);
			},
			function() {
				$flash.setMessage(
					'Error al crear la cuenta. Puede que el usuario ya exista o que haya ingresado un email inválido.');
			}
		);
	};

})

.controller('auth.logout', function authLogout($auth) {
	$auth.logout();
})

; //EOF
