angular.module('app')

.controller('endgame.index', function endgameIndex($stateParams, $flash, $scope, $rootScope) {
	 $scope.user = {
	 	full_name : localStorage.full_name,
	 	last_name : "",
	 	cellphone : "",
	 	email : "",
	 	run : "",
	 	address : ""

	 };
	 console.log(localStorage);
 	$scope.image_profile = localStorage.image;

 	$scope.init = function() {
 		if($rootScope.reloadHeader()){
 			console.log("Hola");
 		}
	};


	
	$scope.init();

	 
})

; //EOF