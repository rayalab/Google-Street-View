'use strict';
angular.module('home', []);

App.config(function($stateProvider) {
  $stateProvider
  .state('defaultLayout.home', {
	url: '/home',
	views: {
        'middle': {
            templateUrl: 'views/home/views/index.html'
        }
    },
  controller: 'homeController'
  });

})
.controller('homeController', ['$scope', '$location', '$rootScope', '$state', 'posterServices', function($scope, $location, $rootScope, $state, posterServices) {

	$scope.init = function() {
		posterServices.getPosters().then(function(result){
			  console.log(result);
		});
	};

	$scope.init();

}]);
