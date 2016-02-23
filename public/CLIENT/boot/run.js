/**
 * First execution, looks for logged user to use in all modules
 */
angular.module('app').run(['$rootScope', '$state', '$location',
    function($rootScope, $state, $location) {
   
        $rootScope.$on('$stateChangeError', function() {
            $state.transitionTo('error.number', { number: 404} );
        });

        // Global reload header function
        $rootScope.reloadHeader = function() {

            //sets the user var that displays logged user's name in the menu

            if (!localStorage.facebook_id) {
                if($rootScope.mobile()){
                    console.log($rootScope.mobile());
                    $state.go('mobile-oauth');
                }else{
                    console.log($rootScope.mobile());
                    $state.go('oauth');
                }
            }else{
                if($rootScope.mobile()){
                    console.log($rootScope.mobile());
                    $state.go('mobile-home');
                }else{
                    console.log($rootScope.mobile());
                    $state.go('home');
                }
            }
        };


        $rootScope.mobile = function (){
            var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
                 (navigator.userAgent.toLowerCase());
            return isMobile;
        };

        $rootScope.init = function (){
            $rootScope.reloadHeader(); 
        };

        $rootScope.init();
    }
]);