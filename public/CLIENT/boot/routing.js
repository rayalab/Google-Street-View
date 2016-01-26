/**
 * Angular UI-Routing
 */
angular.module('layouts').config(['$urlRouterProvider', function($urlRouterProvider) {

    // the known route
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/error/404/");

}]);