angular.module("authService", [])
  .factory("$auth", ['$flash', '$window', '$http', '$location', 'LoopBackAuth',
    'User',
    function($flash, $window, $http, $location, LoopBackAuth, User) {

      return {
        login: function(user) {
          $http({
            method: 'POST',
            url: '/auth/local',
            data: user
          }).then(function successCallback(response) {
            if (response.status === 200 && response.statusText === "OK") {
              var obj = response.data;
              Object.keys(obj).map(function(value) {
                localStorage.setItem(value, obj[value]);
              });
              $window.location.reload();
            }
          }, function errorCallback(response) {
            switch (response.status) {
              case 401:
                $flash.setMessage('Unautorized or Unregistered user');
                break;
              case 400:
                $flash.setMessage('Incomplete user request');
                break;
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
