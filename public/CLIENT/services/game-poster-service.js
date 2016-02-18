angular.module("gamePosterService", [])
  .factory("$gamePoster", ['$window', '$http', '$location',
    function($window, $http, $location) {
      prod = 1;
      api  = 'api.vo.gt';
      
      return {
        create: function(aryObj) {
                return $http.post('http://'+(!prod?$location.$$host:api)+':8000/gamePoster', aryObj).success(function(data) { return data; });
        },
        getAll: function() {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/gamePoster').success(function(data) { return data; });
        },
        getByUser: function(userId) {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/gamePoster/'+userId+'').success(function(data) { return data; });
        },
        getCountByUser: function(userId) {
                return $http.get('http://'+(!prod?$location.$$host:api)+':8000/gamePoster/userposter/'+userId+'').success(function(data) { return data; });
        }
      };

    }
  ]);
