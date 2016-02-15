angular.module("clueService", [])
  .factory("$clue", ['$window', '$http', '$location',
    function($window, $http, $location) {
      prod = 0;
      api  = 'api.vo.gt';
      
      return {
        getAll: function() {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/cluePoster').success(function(data) { return data; });
        },
        getByPosterId: function(Obj) {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/cluePoster/'+Obj+'').success(function(data) { return data; });
        }
      };

    }
  ]);
