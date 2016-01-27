angular.module("clueService", [])
  .factory("$clue", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        getAll: function() {
                return $http.get('/cluePoster').success(function(data) { return data; });
        },
        getByPosterId: function(Obj) {
                return $http.get('/cluePoster/'+Obj+'').success(function(data) { return data; });
        }
      };

    }
  ]);
