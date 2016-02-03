angular.module('app')

.controller('endgame.index', function endgameIndex($stateParams, $flash, $scope, $rootScope) {
	 $scope.user = {
	 	name : "",
	 	last_name : "",
	 	cellphone : "",
	 	email : "",
	 	run : "",
	 	city : "",
	 	address : ""

	 };

 	$scope.init = function() {
 		if($rootScope.reloadHeader()){
 			console.log("Hola");
 		}
	};

	
	$scope.init();

	 
})

; //EOF