angular.module('layouts').config(['$stateProvider', function ($stateProvider) {

    // Error layout
    $stateProvider
        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'layouts/admin/layout.html',
        })

}]);