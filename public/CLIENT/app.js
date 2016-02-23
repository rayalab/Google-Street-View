/** 
* Configure app
*/
angular.module('config', [])
.constant('config', {
	developerMode: true,
	appName: "Google Street View",
	appVersion: "1.0",
});


/**
 * Initialize main layouts
 */
angular.module('layouts', [
	'ui.router',
	'config'
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
	'config',
	'layouts',
	'ngResource',
	'oauthFacebookService',
	'posterService',
	'clueService',
	'gamePosterService',
	'sprintfService',
	'autoMenu',
	'materialize',
	'userService',
])
/**
 * Main controller
 */
.controller("main.controller", function mainController() {

})

; //EOF
