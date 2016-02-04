angular.module('autoMenu', [])


.directive('autoMenu', function () {
    return {
    	templateUrl: 'components/auto-menu/template.html',
    	restrict: 'E',
    	scope: {},
    };
})


.factory('$autoMenu', function($rootScope) {
	return {
	    add: function(mod) {
	    	if (!$rootScope.listaModulos) { 
	    		$rootScope.listaModulos=[];
	    	}
	    	$rootScope.listaModulos.push(mod);
	    }
	};
}); 
