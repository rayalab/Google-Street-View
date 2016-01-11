'use strict';
angular.module('trackFactory', []);

//Factory
App
.factory('trackServices', ['$http', function($http) {

    var factoryDefinitions = {
      getTrackById: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      },
      getTracks: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      },
      getTracksByPoster: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      },
      getTracksByPosters: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      }
  	}  
  	
    return factoryDefinitions;
  }
]);