/**
 * Cache management
 */
angular.module('app').config(['$httpProvider', function($httpProvider) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    }
}]);