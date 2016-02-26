angular.module('app')

.controller('auth.login', function authLogin($stateParams, $scope, $oauth) {

	$scope.sendPost = function() {
		$oauth.login();
	};
})

.controller('auth.logout', function authLogout($auth) {
	$auth.logout();
})

; //EOF
