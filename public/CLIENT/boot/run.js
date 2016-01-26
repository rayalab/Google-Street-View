/**
 * First execution, looks for logged user to use in all modules
 */
angular.module('app').run(['$rootScope', '$state', '$flash', 'LoopBackAuth', 'User',
    function($rootScope, $state, $flash, LoopBackAuth, User) {

        $rootScope.$on('$stateChangeError', function() {
            $state.transitionTo('error.number', { number: 404} );
        });

        $rootScope.headerUrl = null;
        $rootScope.currentUser = null;
        $rootScope.currentToken = null;

        // Global reload header function
        $rootScope.reloadHeader = function() {
            $rootScope.currentUser = LoopBackAuth.currentUserId;
            $rootScope.currentToken = LoopBackAuth.accessTokenId;

            //sets the user var that displays logged user's name in the menu
            if (User.isAuthenticated()) {
                User.getCurrent(function(res) {
                    $rootScope.currentUserName=res.username;
                });
            }
        };

        $rootScope.flash = $flash;
        $rootScope.reloadHeader();
    }
]);