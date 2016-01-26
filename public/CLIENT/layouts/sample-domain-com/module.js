angular.module('layouts')

.controller("layout.sample-domain-com", function layoutSampleDomainCom($scope, $layoutHandler) {
	$scope.layoutName = $layoutHandler.getLayout();
});