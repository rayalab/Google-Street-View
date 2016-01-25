angular.module('layouts').config(['$stateProvider', function($stateProvider) {

    var layoutName = 'admin';
    var urlRoute = '/admin';

    $stateProvider
        .state(layoutName, {
            abstract: true,
            url: urlRoute,
            templateUrl: '/layouts/' + layoutName + '/layout.html',
            controller: 'layout.' + layoutName
        })
        .state(layoutName + '.provider', {
            url: '/{provider}/{methodName}/{opt1}/{opt2}/{opt3}',
            params: {
                layout: {
                    value: layoutName
                },
                provider: {
                    value: 'pages',
                    squash: true
                },
                methodName: {
                    value: 'index',
                    squash: true
                },
                opt1: {
                    value: null,
                    squash: true
                },
                opt2: {
                    value: null,
                    squash: true
                },
                opt3: {
                    value: null,
                    squash: true
                },
            },
            templateUrl: function(stateParams) {
                return 'modules/' + layoutName + '.' + stateParams.provider + '/views/' + stateParams.methodName + '.html';
            },
            controllerProvider: function($stateParams) {
                var controllerName = "admin." + $stateParams.provider + "." + $stateParams.methodName;
                return controllerName;
            }
        });

}])

.controller("layout.admin", function layoutAdmin() {

});