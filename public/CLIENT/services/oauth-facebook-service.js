angular.module("oauthFacebookService", [])
  .factory("$oauth", ['$window', '$http', '$location', '$state',
	function($window, $http, $location, $state) {
	prod = 1;
	api  = 'api.vo.gt';

	  return {
		login: function() {
				FB.login(function(response) {
				  if (response.authResponse) {
				   FB.api('/me', 'get', {fields: 'last_name, name, email, id'}, function(response) {

			   		    FB.api("/me/picture?width=67&height=67",  function(responsePicture) {
			   		    	console.log(responsePicture);
			   		     localStorage.setItem('image', responsePicture.data.url.split('https://')[1]);		
						 var accessToken = FB.getAuthResponse();
						 var aryObj = {
						  full_name   : response.name,
						  last_name   : response.last_name,
						  email       : response.email,
						  facebook_id : response.id,
						  facebook_token : accessToken.accessToken
						 };

				   		var dataStorage = $http.post('http://'+(!prod?$location.$$host:api)+':8000/social', aryObj).success(function(data) {
				   			console.log(data.new); 
							localStorage.bienvenida = data.new;	
							Object.keys(data.user).map(function(value) {
							  localStorage.setItem(value, data.user[value]);
							});
							Object.keys(data.game).map(function(value) {
							  localStorage.setItem(value, data.game[value]);
							});
							//return 'ok';
						 });

						  dataStorage.then(function successCallback(response) {
							$state.go('home');
						  });
					    }); 
					});
				  } else {
				   console.log('User cancelled login or did not fully authorize.');
				  }
		  });
		},
		logout: function() {
			f=['full_name', 'last_name', 'email', 'facebook_id', 'image', 'facebook_token', 'finish', 'game_id', 'position_latitude', 'position_longitude', 'start'];
			for(i in f) {
				localStorage.setItem(f[i], '');
			}
			$state.go('oauth');

		},

	  };

	}
  ]);