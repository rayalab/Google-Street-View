angular.module("userService", [])
  .factory("$user", ['$window', '$http', '$location',
    function($window, $http, $location) {
      prod = 1;
      api  = 'api.vo.gt';
      
      return {
        update: function(userId, aryObj) {
                return $http.put('http://'+(!prod?$location.$$host:api)+':8000/user/'+userId+'', aryObj).success(function(data) { return data; });
        }
      };

    }
  ]);
