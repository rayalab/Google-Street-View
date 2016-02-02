angular.module('layouts')

.controller("layout.gsv-com", function layoutSa($scope, $layoutHandler) {
	$scope.layoutName = $layoutHandler.getLayout();
});
