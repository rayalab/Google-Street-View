angular.module("oauthFacebookService", [])
  .factory("$oauth", ['$window', '$http', '$location',
	function($window, $http, $location) {

	  return {
		login: function() {
				FB.login(function(response) {
				  if (response.authResponse) {
				   console.log('Welcome!  Fetching your information.... ');
				   FB.api('/me', 'get', {fields: 'last_name, name, email, id, picture'}, function(response) {
				   		console.log(response);
						 var accessToken = FB.getAuthResponse();
						 var aryObj = {
						  full_name   : response.name,
						  last_name   : response.last_name,
						  email       : response.email,
						  facebook_id : response.id,
						  facebook_token : accessToken.accessToken
						 };
						 localStorage.setItem('image', response.picture.data.url.split('https://')[1]);

						 var dataStorage = $http.post('http://'+$location.$$host+':8000/social', aryObj).success(function(data) { 
							Object.keys(data.user).map(function(value) {
							  localStorage.setItem(value, data.user[value]);
							});
							Object.keys(data.game).map(function(value) {
							  localStorage.setItem(value, data.game[value]);
							});
							return 'ok';
						 });
						 console.log(localStorage);
						  dataStorage.then(function successCallback(response) {
							$window.location.href = '#/home';
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
			$location.path('/auth/login');

		},

	  };

	}
  ]);
