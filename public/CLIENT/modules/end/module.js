angular.module('app')

.controller('end.index', function endgameIndex($stateParams, $flash, $scope, $rootScope, $user, $location) {
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

 	$scope.run = false;
 	$scope.cellphone = false;
 	$scope.address = false;
 	$scope.email = false;

 	$scope.init = function() {
 		$rootScope.reloadHeader();
	};




 	$scope.sendInformation = function() {
 		if($scope.user.run != ""){
 			if($scope.user.email != ""){
 				if($scope.user.cellphone != ""){
 					if($scope.user.address != ""){
 						$user.update(localStorage.user_id, $scope.user).then(function(result){
							console.log(result);
							$("#success").openModal();
						});	
 					}else{
 						$scope.address = true;
 					}
 				}else{
 					$scope.cellphone = true;
 				}
 			}else{
 					$scope.email = true;
 			}
 		}else{
 				$scope.run = true;
 		}	
	};

	$scope.backHome = function() {
    	if($("#success").is(':visible')){
    		$("#success").closeModal();
    		$location.path("/home");
    	}else{
	    	$location.path("/home");
    	}

	};

	$scope.shared = function() {
		FB.login(function(){
		  FB.api('/me/feed', 'post', 
		  	{message: 'Ya estoy participando en Hambre de Lolla Street View Lollapalooza 2016', 'source': 'http://www.hambredelolla.cl/'}
		   );

		}, {scope: 'publish_actions'});
	};	

	$scope.onPostToWallCompleted = function(obj) {
		console.log(obj);
	};

	$scope.init();

})

; //EOF