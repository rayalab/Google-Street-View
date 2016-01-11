'use strict';
angular.module('userFactory', []);

//Factory
App
.factory('userServices', ['$http', function($http) {

    var factoryDefinitions = {
      getUserById: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      }
  	}  
  	
    return factoryDefinitions;
  }
]);