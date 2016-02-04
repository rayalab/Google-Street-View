/**
 * First execution, looks for logged user to use in all modules
 */
angular.module('app').run(['$rootScope', '$state', '$flash', '$location',
    function($rootScope, $state, $flash, $location) {
   
        $rootScope.$on('$stateChangeError', function() {
            $state.transitionTo('error.number', { number: 404} );
        });

        $rootScope.headerUrl = null;
        $rootScope.currentUser = null;
        $rootScope.currentToken = null;

        // Global reload header function
        $rootScope.reloadHeader = function() {

            //sets the user var that displays logged user's name in the menu

            if (!localStorage.full_name) {
                $location.path('/auth/login');
            }else{
                return true;
            }
        };

        $rootScope.flash = $flash;
        $rootScope.reloadHeader();
    }
]);