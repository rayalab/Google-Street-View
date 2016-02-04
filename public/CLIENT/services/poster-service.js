angular.module("posterService", [])
  .factory("$poster", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        getPosterRandom: function(id) {
                return $http.get('http://'+$location.$$host+':8000/poster/random/'+id+'').success(function(data) { return data; });
        },
        getById: function(Obj) {
                return $http.get('http://'+$location.$$host+':8000/poster/'+Obj+'').success(function(data) { return data; });
        },
        getAllImagesByPosterId: function() {
                return $http.get('http://'+$location.$$host+':8000/posterImage', aryObj).success(function(data) { return data; });
        },
      };

    }
  ]);
