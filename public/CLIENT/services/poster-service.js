angular.module("posterService", [])
  .factory("$poster", ['$window', '$http', '$location',
    function($window, $http, $location) {
      prod = 1;
      api  = 'api.vo.gt';
      
      return {
        getPosterRandom: function(id) {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/poster/random/'+id+'').success(function(data) { return data; });
        },
        getById: function(Obj) {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/poster/'+Obj+'').success(function(data) { return data; });
        },
        getAllImagesByPosterId: function() {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/posterImage', aryObj).success(function(data) { return data; });
        },
      };

    }
  ]);
