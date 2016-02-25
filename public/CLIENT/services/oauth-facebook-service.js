angular.module("oauthFacebookService", [])
  .factory("$oauth", ['$window', '$http', '$location', '$state', '$timeout',
	function($window, $http, $location, $state, $timeout) {
	prod = 1;
	api  = 'api.vo.gt';

	  return {
		login: function() {
				FB.login(function(response) {
				  if (response.authResponse) {
				   FB.api('/me', 'get', {fields: 'last_name, name, email, id'}, function(response) {

			   		    FB.api("/me/picture?width=67&height=67",  function(responsePicture) {
			   		     localStorage.setItem('image', responsePicture.data.url.split('https://')[1]);		
						 var accessToken = FB.getAuthResponse();
						 var aryObj = {
						  full_name   : response.name,
						  last_name   : response.last_name,
						  email       : response.email,
						  facebook_id : response.id,
						  facebook_token : accessToken.accessToken
						 };
						 localStorage.facebook_id = response.id;
					   		$http.post('http://'+(!prod?$location.$$host:api)+':8000/social', aryObj).success(function(data) {
					   			if(data){
									localStorage.bienvenida = data.new;
									localStorage.album = data.new;
									localStorage.user_id = data.user.user_id;	
									localStorage.full_name = data.user.full_name;	
									localStorage.name = data.user.name;	
									localStorage.position_latitude = data.user.position_latitude;	
									localStorage.position_longitude = data.user.position_longitude;	
									localStorage.game_id = data.game;


			   						var delay = $timeout(function() {
			   							console.log(localStorage);
										$timeout.cancel(delay);
										$state.go('home');
							    	},3000);
					   			}	
							 });
					    }); 
					});
				  } else {
				   console.log('User cancelled login or did not fully authorize.');
				  }
		  });
		},
		logout: function() {
			f=['full_name', 'last_name', 'email', 'facebook_id', 'image', 'facebook_token', 'finish', 'game_id', 'position_latitude', 'position_longitude', 'start', 'album', 'bienvenida'];
			for(i in f) {
				localStorage.setItem(f[i], '');
			}
			$state.go('oauth');

		},

	  };

	}
  ]);