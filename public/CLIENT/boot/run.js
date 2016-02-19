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
                if($rootScope.mobile()){
                    console.log($rootScope.mobile());
                    return'oauth-mobile';
                }else{
                    console.log($rootScope.mobile());
                    return 'oauth';
                }
            }else{
                if($rootScope.mobile()){
                    console.log($rootScope.mobile());
                    return'home-mobile';
                }else{
                    console.log($rootScope.mobile());
                    return 'home';
                }
            }
        };


        $rootScope.mobile = function (){
            var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
                 (navigator.userAgent.toLowerCase());
            return isMobile;
        };

        $rootScope.init = function (){
            var where = $rootScope.reloadHeader();
            $state.go(where);
        };

        $rootScope.flash = $flash;
        $rootScope.init();
    }
]);