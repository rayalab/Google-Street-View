angular.module("clueService", [])
  .factory("$clue", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        getAll: function() {
                return $http.get('http://gsv.com:8000/cluePoster').success(function(data) { return data; });
        },
        getByPosterId: function(Obj) {
                return $http.get('http://gsv.com:8000/cluePoster/'+Obj+'').success(function(data) { return data; });
        }
      };

    }
  ]);
