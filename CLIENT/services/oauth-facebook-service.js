angular.module("oauthFacebookService", [])
  .factory("$oauth", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        login: function() {
                FB.login(function(response) {
                  if (response.authResponse) {
                   console.log('Welcome!  Fetching your information.... ');
                   FB.api('/me', 'get', {fields: 'last_name, name, email, id, gender'}, function(response) {
                         var accessToken = FB.getAuthResponse();
                         var aryObj = {
                          full_name   : response.name,
                          last_name   : response.last_name,
                          email       : response.email,
                          facebook_id : response.id,
                          gender      : response.gender,
                          facebook_token : accessToken.accessToken
                         };
                         return aryObj;
                    });
                  } else {
                   console.log('User cancelled login or did not fully authorize.');
                  }
          });
        },
        logout: function() {
          var tokenId = LoopBackAuth.accessTokenId;
          User.logout({
              access_token: tokenId
            },
            // On Success
            function() {
              localStorage.setItem('$LoopBack$accessTokenId', '');
              localStorage.setItem('$LoopBack$currentUserId', '');
              $location.path('/auth/login');
              $window.location.reload();
            },
            // On error
            function(err) {
              $flash.setMessage(err.data.error.message);
              localStorage.setItem('$LoopBack$accessTokenId', '');
              localStorage.setItem('$LoopBack$currentUserId', '');
              $location.path('/auth/login');
              $window.location.reload();
            }
          );
        },
        checkLogged: function() {
          var tokenId = LoopBackAuth.accessTokenId;
          if (tokenId === null || tokenId === "") {
            $location.path('/auth/login');
            $window.location.reload();
          }
        }
      };

    }
  ]);
