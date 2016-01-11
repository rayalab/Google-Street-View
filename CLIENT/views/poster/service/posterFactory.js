'use strict';
angular.module('posterFactory', []);

//Factory
App
.factory('posterServices', ['$http', function($http) {

    var factoryDefinitions = {
      getPosterById: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      },
      getPosters: function(loginReq) {
        return $http.get('http://localhost:8000/poster').success(function(data) { return data; });
      },
      getPosterById: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      }
  	}

    return factoryDefinitions;
  }
]);
