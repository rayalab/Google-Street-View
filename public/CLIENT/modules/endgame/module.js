angular.module('app')

.controller('endgame.index', function endgameIndex($stateParams, $flash, $scope) {
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
 		$('#squarespaceModal').openModal();
	};

	
	$scope.init();

	 
})

; //EOF