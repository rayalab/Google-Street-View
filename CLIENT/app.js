/**
 * Initialize main layouts
 */
angular.module('layouts', [
	'ui.router',
	'flashMessage',
	'layoutHandler'
]);

/**
 * Initialize components
 */
angular.module('ngEnter', []);

/**
 * Define "app" module and inject all other components and services as dependencies
 */
angular.module('app', [
	'ngEnter',
	'layouts',
	'ngResource',
	'lbServices',
	'flashMessage',
	'oauthFacebookService',
	'autoMenu',
	'materialize'
])

/**
 * Main controller
 */
.controller("main.controller", function mainController() {

})

; //EOF
