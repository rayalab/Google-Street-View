angular.module('layouts').config(['$stateProvider', function ($stateProvider) {

    // Error layout
    $stateProvider
        .state('error', {
            abstract: true,
            url: '/error',
            templateUrl: '/layouts/error/layout.html',
        })
        .state('error.number', {
            url: '/:number',
            templateUrl: function (stateParams) {
                return '/layouts/error/views/' + stateParams.number + '.html';
            }
        });

}]);