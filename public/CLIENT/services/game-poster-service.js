angular.module("gamePosterService", [])
  .factory("$gamePoster", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        create: function(aryObj) {
                return $http.get('http://'+$location.$$host+':8000/gamePoster', aryObj).success(function(data) { return data; });
        },
        getAll: function() {
                return $http.get('http://'+$location.$$host+':8000/gamePoster').success(function(data) { return data; });
        }
      };

    }
  ]);
