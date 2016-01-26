angular.module("trackService", [])
  .factory("$track", ['$window', '$http', '$location',
    function($window, $http, $location) {

      return {
        getTracksByPoster: function(poster_id) {
        return $http.get('http://localhost:8000/track/'+poster_id+'').success(function(data) { return data; });
        }
      };

    }
  ]);
