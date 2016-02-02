angular.module("posterService", [])
  .factory("$poster", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        getAll: function() {
                return $http.get('http://'+$location.$$host+':8000/poster').success(function(data) { return data; });
        },
        getById: function(Obj) {
                return $http.get('http://'+$location.$$host+':8000/poster/'+Obj+'').success(function(data) { return data; });
        }
      };

    }
  ]);
