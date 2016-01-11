'use strict';
angular.module('loginFactory', []);

//Factory
App
.factory('loginServices', ['$http', function($http) {

    var factoryDefinitions = {
      login: function(loginReq) {
        return $http.post('views/security/mock/login.json', loginReq).success(function(data) { return data; });
      },
	  signup: function(signupReq) {
        return $http.post('views/common/mock/success.json', signupReq).success(function(data) { return data; });
      }
	}
	
    return factoryDefinitions;
  }
])