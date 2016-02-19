angular.module('app')

.controller('home.index', function homeIndex($stateParams, $flash, $scope, $poster, $clue, $location, $oauth, $rootScope, $gamePoster, $timeout, $state, $user, $window) {
		
	$scope.full_name = localStorage.full_name;
	$scope.facebook_id = localStorage.facebook_id;
	$scope.image_profile = localStorage.image;
	$scope.gmarkers = [];
	$scope.clicksDone = 0;

	$scope.user = {
	 	full_name : localStorage.full_name,
	 	last_name : "",
	 	cellphone : "",
	 	email : "",
	 	run : "",
	 	address : ""
	 };


	// calle  -33.39790772, -70.5823195
	// cartel -33.39775097,-70.58235705

	$scope.zoom = 11;
	$scope.slat = localStorage.position_latitude;	
	$scope.slng = localStorage.position_longitude;	
	$scope.sheading = 69.58;
	$scope.spitch = 5;
	$scope.szoom = 1;
	$scope.distance = 0;
	$scope.maximumDistance = 60;
	$scope.panWidth = 800;
	$scope.panHeight = 600;
	$scope.markerWidth = 80;
	$scope.markerHeight = 100;
	$scope.lat =  0;
	$scope.lng =  0;
	$scope.lat_line =  0;
	$scope.lng_line =  0;
	$scope.lat_wall_line =  0;
	$scope.lng_wall_line =  0;
	$scope.currentZone = {};
	$scope.mode=true;
	$scope.init = true;
	$scope.testField = "";
	$scope.obj = [];
	$scope.posPersona = new google.maps.LatLng(-33.44560, -70.66033);
	$scope.titlePosterFound = "";
	$scope.descriptionPosterFound = "";
	$scope.aryMyPosterId = [];
	$scope.aryMyPosters = [];
	$scope.lastDistance = 0;
	//$scope.imgBaseURL = "http://d3g8amkxnw6wed.cloudfront.net/";
	$scope.imgBaseURL = "http://s3-us-west-2.amazonaws.com/gsv.rayalab.cl/";

	$scope.aryTextFindPoster = [
		{
			'title' : "Encontraste tu primer poster",
			'description' : "Aún te quedan dos por descubrir esta semana y así participar en el sorteo por entradas VIP dobles a Lollapalooza 2016."
		},
		{
			'title' : "Encontraste tu segundo poster",
			'description' : "Estas a sólo un poster de poder participar en el sorteo por entradas  VIP dobles a Lollapalooza 2016. ¡Sigue buscando!"
		},
		{
			'title' : "Encontraste tu tercer poster",
			'description' : "Ya estás participando en el sorteo por entradas VIP dobles para Lollapalooza 2016. Sigue completando tu álbum y aumenta tus posibilidades de ganar."
		},
		{
			'title' : "Ya eres un experimentado",
			'description' : "Sigue completando tu álbum y aumenta aún más tus posibilidades de ganar una entrada VIP doble para Lollapalooza 2016."
		}
	];

	$scope.aryDefaultPosters = [
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		},
		{
			'img' : "bundles/img/default.png"
		}
	];


	/**
	 * Tira el menu hacia la izquierda
	 * 
	 * @return {[type]} [description]
	 */
	$scope.actionMenu = function() {
		if(!$scope.$parent.$parent.menu){
			$scope.$parent.$parent.menu = true;
		}else{
			$scope.$parent.$parent.menu = false;
		}

	};

	$scope.logout = function() {
		$oauth.logout();
	};
	
	
	$scope.actionClose = function(){
		$("#modal33").openModal();
		$scope.clicksDone=-4;
	};
	
	$scope.actionViewMap = function(){

		if($scope.mode){
			$scope.main_map_init();
		}else{
			$scope.mode=true;
			$scope.map.setCenter(new google.maps.LatLng($scope.currentZone.default_clue_latitude, $scope.currentZone.default_clue_longitude));
			$scope.map.setZoom($scope.zoom + 3);
		}
	};

	$scope.actionViewMapNextPoster = function(){
			$scope.mode=true;
			$scope.map.setCenter(new google.maps.LatLng($scope.currentZone.default_clue_latitude, $scope.currentZone.default_clue_longitude));
			$scope.map.setZoom($scope.zoom + 1);
			var delay = $timeout(function() {
				$timeout.cancel(delay);
		    	$scope.main_map_init();
		    },500);
	};

	$scope.actionDismiss = function() {
		$scope.clicksDone=0;
	};

    $scope.actionModalOpen = function(id){

    	if($("#"+id+"").is(':visible')){
    		$("#"+id+"").closeModal();
    	}else{
	    	$("#"+id+"").openModal();
    	}
    };

	//$rootScope.reloadHeader();


	$scope.aer = function(a) {
		if (a == 13) $scope.gogo($scope.whereGogo);
	}
	/**
	 * Utilidad para debug: lleva directamente a un poster
	 * 
	 * @return {[type]} [description]
	 */
	$scope.gogo = function(id) {
		//ahora que es aleatorio, agarraremos el primero que obtuvimos nomas
		var item = (function(){ for(var i in $scope.posters) return $scope.posters[i] })()
		$scope.usingGogo = true;
		$scope.currentZone = $scope.posters[id];
		$scope.m_initPanorama($scope.posters[id].default_clue_latitude, $scope.posters[id].default_clue_longitude);
	};


	/**
	 * Te devuelve a las pistas secundarias del poster.
	*/
	$scope.backMapSecondClue = function() {
			$scope.mode=true;
			$scope.map.setCenter(new google.maps.LatLng($scope.currentZone.default_clue_latitude, $scope.currentZone.default_clue_longitude));
			$scope.map.setZoom($scope.zoom + 4);
	};



	/**
	 * Añade un marcador al mapa, representando una pista
	 * 
	 * @param {[type]} item [description]
	 */
	$scope.addClueMarker = function(item, cat) {
		//PONER PISTA
		var newClue = {};
		newClue.mycategory = cat;

		newClue = new google.maps.Marker({
			position: new google.maps.LatLng(item.latitude, item.longitude),
			map: $scope.map,
			icon: $scope.imgBaseURL + 'pines/pines-clue/'+$scope.currentZone.poster_id+'.png',
			visible:true,
			draggable: false

		});

		newClue.addListener('click', function() {
			console.log('setting current zone to',$scope.currentZone);
			$scope.m_initPanorama(item.latitude, item.longitude);
		});
	}


	/**
	 * Te lleva desde la primera pista a la segunda, esconde las pistas principales, muestra siguientes 5 pistas
	 * 
	 * @param  {[type]} category [description]
	 * @param  {[type]} obj      [description]
	 * @return {[type]}          [description]
	 */
	$scope.nextClue = function(category, obj) {

		for (var i=0; i< $scope.gmarkers.length; i++) {
          if ($scope.gmarkers[i].mycategory == category) {
            $scope.gmarkers[i].setVisible(false);
          }
        }

		$clue.getByPosterId(obj.poster_id).then(function(result){
			var response = JSON.parse(JSON.stringify(result.data));
			$scope.map.setCenter(new google.maps.LatLng(obj.default_clue_latitude, obj.default_clue_longitude));
			$scope.map.setZoom($scope.zoom + 4);
			$scope.addClueMarker({latitude:obj.default_clue_latitude, longitude:obj.default_clue_longitude});
			angular.forEach(response, function(item) {
					$scope.addClueMarker(item, "second_clue");
				});
		});	
	};

	/**
	 * Evento de los markers de pistas principales que levanta el modal con boton "siguiente"
	 * 
	 * @param  {[type]} item          [description]
	 * @param  {[type]} firtsCategory [description]
	 * @return {[type]}               [description]
	 */
	$scope.clickClue = function(item, firtsCategory) {
		$scope.default_avatar = "";
		$scope.titlePoster = item.poster_title;
		$scope.titleClue = item.default_clue_title;
		$scope.descriptionClue = item.default_clue_description;
		$scope.default_avatar = item.image_default;
		$scope.category = firtsCategory;
		$scope.obj = item;
		if (!$scope.usingGogo) $scope.$apply();
	   $('#modalClue').openModal();
	};

	//cachear ubicaciones de banderas y posters
	$scope.init = function() {

		if($rootScope.reloadHeader()){
			$poster.getPosterRandom(localStorage.user_id).then(function(result){
				var response = JSON.parse(JSON.stringify(result.data));
				$scope.aryPoster = response;
				$scope.main_map_init();
			});	
		}	
	};

	
	$scope.main_map_init = function (){
		console.log("Hola");
		$scope.mode=true;
		var div_main_map = document.getElementById("div_main_map");
	    $scope.map = new google.maps.LatLng(-33.44560, -70.66033);

			var mapOptions =
			{
				center: $scope.map,
				zoom: $scope.zoom,
				mapTypeId: google.maps.MapTypeId.HYBRID,
				scaleControl: false,
				// scrollwheel: false,
				// draggable: false,
				disableDefaultUI: true,
				mapTypeControl: false
			};

			$scope.map = new google.maps.Map(div_main_map, mapOptions);


			//colocar banderas y posters
			$scope.posters = [];
			angular.forEach($scope.aryPoster, function(item) {
				$scope.posters[item.poster_id] = item;
				var newFlag;
				var firtsCategory = "firts_clue";

				//PONER BANDERA
				newFlag = new google.maps.Marker({
					position: new google.maps.LatLng(item.default_clue_latitude, item.default_clue_longitude),
					map: $scope.map,
					title : 'poster '+item.poster_id+': '+item.default_clue_title,
					icon: $scope.imgBaseURL + 'pines/'+item.poster_id+'.png',
					visible:true,
					draggable: false
				});
				newFlag.mycategory = firtsCategory;

				$scope.gmarkers.push(newFlag);

				newFlag.addListener('click', function() {
					$scope.currentZone = item;
					$scope.clickClue(item, firtsCategory);
				});
			});	
			if($scope.init){
				$gamePoster.getByUser(localStorage.user_id).then(function(result){
					if(result.data !== "empty"){
						$scope.init = false;	
						var response = JSON.parse(JSON.stringify(result.data));
						$scope.aryDefaultPosters.splice(0, response.length)
						angular.forEach(response, function(item) {
							var newAry = {
								'img' : item.image_default
							};
							$scope.aryMyPosterId.push(item.poster_id);
							$scope.aryMyPosters.push(newAry);
						});	
					}
				});	
			}
	};

	/**
	 * Start a StreetView in the #panDiv element
	 * 
	 * @return {[type]} [description]
	 */
	$scope.m_initPanorama = function (clue_latitude, clue_longitude){
		var visible = false;
		var l_panDiv = document.getElementById("panDiv");
		$scope.mode = false;
		$scope.currentZone.default_clue_latitude = clue_latitude;
		$scope.currentZone.default_clue_longitude = clue_longitude;
		$scope.clicksDone=0;

		//SITUAR PERSONA Y COLOCAR POSTER
		$scope.currentZone.posPersona = new google.maps.LatLng($scope.currentZone.default_clue_latitude, $scope.currentZone.default_clue_longitude);
		$scope.currentZone.posPoster = new google.maps.LatLng($scope.currentZone.latitude,$scope.currentZone.longitude);
		$scope.currentZone.posReference = new google.maps.LatLng($scope.currentZone.latitude_line, $scope.currentZone.longitude_line);
  		
		$scope.currentZone.images = {
			foto_001 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/001.png",
			foto_002 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/002.png",
			foto_003 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/003.png",
			foto_004 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/004.png",
			foto_005 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/005.png",
			foto_006 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/006.png",
			foto_007 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/007.png",
			foto_008 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/008.png",
			foto_009 : $scope.imgBaseURL+$scope.currentZone.poster_id+"/009.png"
		};
		if (!$scope.usingGogo) $scope.$apply();



		// controls can be hidden here to prevent the position being changed by the user
		var l_panOptions =
		{	
	    	linksControl: true,
	        panControl: false,
			zoomControl: false,
			addressControl: false,
        	// linksControl: false, //desactiva las flechas
		};

		l_panOptions.position = $scope.currentZone.posPersona;
		l_panOptions.pov =
		{	
			heading: $scope.sheading,
			pitch: $scope.spitch,
			zoom: $scope.szoom
		};

		$scope.pan = new google.maps.StreetViewPanorama(l_panDiv, l_panOptions);

		$scope.map.setStreetView($scope.pan);

		//GIRAR CAMARA
		google.maps.event.addListener($scope.pan, 'pov_changed', function ()
		{
			$scope.m_updateMarker();
		});


		//CAMBIO DE ZOOM
		google.maps.event.addListener($scope.pan, 'zoom_changed', function ()
		{
			$scope.m_updateMarker();
		});


		//CAMBIO DE UBICACION
		google.maps.event.addListener($scope.pan, 'position_changed', function ()
		{
		    $scope.currentZone.posPersona = $scope.pan.getPosition();
		    $scope.map.setCenter($scope.currentZone.posPersona);
		    $scope.m_updateMarker();

		    //resetear avisos de distancia si se acerca al poster
		    if ($scope.lastDistance == 0) $scope.lastDistance = $scope.distance_to_street_reference;
		    else if ($scope.distance_to_street_reference < $scope.lastDistance) $scope.clicksDone=0;
		    console.log(($scope.distance_to_street_reference < $scope.lastDistance ? 'mas cerca':'mas lejos')

		    $scope.clicksDone++;
			if ($scope.distance_to_street_reference > 300 && $scope.clicksDone > 3) {
				$scope.actionModalOpen('error');
				$scope.clicksDone=0;
			}
			else if ($scope.distance_to_street_reference > 50 && $scope.clicksDone > 3) {
				$scope.actionModalOpen('modal33');
				$scope.clicksDone=0;
			}
		});
	}

	/**
	 * Show and/or move posters accordingly with camera position
	 * @return {[type]} [description]
	 */
	$scope.m_updateMarker = function () {
			$scope.panWidth = angular.element('#panDiv').width();
			$scope.panHeight = angular.element('#panDiv').height();

			var l_pov = $scope.pan.getPov();
			if (l_pov)
			{
				var l_zoom = $scope.pan.getZoom();

				// scale according to street view zoom level
				var l_adjustedZoom = Math.pow(2, l_zoom) / 2;


				// recalculate icon heading and pitch now
				$scope.sheading = google.maps.geometry.spherical.computeHeading($scope.currentZone.posPersona, $scope.currentZone.posPoster)
				$scope.distance = google.maps.geometry.spherical.computeDistanceBetween($scope.currentZone.posPersona, $scope.currentZone.posPoster);
				$scope.distance_to_street_reference = google.maps.geometry.spherical.computeDistanceBetween($scope.currentZone.posPersona, $scope.currentZone.posReference);

				var l_pixelPoint = $scope.m_convertPointProjection(l_pov, l_adjustedZoom);

				var l_markerDiv = document.getElementById("markerDiv");


				var l_distanceScale = 50 / $scope.distance;
				l_adjustedZoom = l_adjustedZoom * l_distanceScale;

				// _TODO scale marker according to distance from view point to marker 
				// beyond maximum range a marker will not be visible

				// apply position and size to the marker div
				var wd = $scope.markerWidth * l_adjustedZoom;
				var ht = $scope.markerHeight * l_adjustedZoom;

				var x = l_pixelPoint.x - Math.floor(wd / 2);
				var y = l_pixelPoint.y - Math.floor(ht / 2);


				// angulos ahora: 28, 48, 60, 62, 67, 69   8   46, 65, 75, 81, 84, 85


				//ANGLE
				var angle_in_radians = $scope.find_angle(
					{
						'x': $scope.currentZone.posPersona.lat(), 
						'y': $scope.currentZone.posPersona.lng()}, 
					{
						'x': $scope.currentZone.latitude, 
						'y': $scope.currentZone.longitude
					}, 
					{
						'x': $scope.currentZone.latitude_line, 
						'y': $scope.currentZone.longitude_line
					}
				);
				var angle_in_degrees = angle_in_radians * (180/3.1415);
				console.log('[seb] angle: ' + angle_in_degrees);


				//ANGLE WALL
				var angle_in_radians_wall = $scope.find_angle(
					{
						'x': $scope.currentZone.posPersona.lat(), 
						'y': $scope.currentZone.posPersona.lng()
					},
					
					
					{
						'x': $scope.currentZone.latitude, 
						'y': $scope.currentZone.longitude
					}, 

					{
						'x': $scope.currentZone.latitude_wall_line, 
						'y': $scope.currentZone.longitude_wall_line
					}

					
				);
				var angle_in_degrees_wall = angle_in_radians_wall * (180/3.1415);
				console.log('[seb] angle wall: ' + angle_in_degrees_wall);

				var posters_id = [
					document.getElementById("foto_001"),
					document.getElementById("foto_002"), 
					document.getElementById("foto_003"),
					document.getElementById("foto_004"),
					document.getElementById("foto_005"),
					document.getElementById("foto_006"),
					document.getElementById("foto_007"),
					document.getElementById("foto_008"),
					document.getElementById("foto_009")
				 ];

				if (angle_in_degrees < 10 ) {
					posters_id[4].style.display = '';
					$scope.hidePosters(posters_id, 4);
				}
				else {
					var id = 0;
					var modifier = 0;
					if (angle_in_degrees_wall < 90) {
						modifier = 5;
					}

					if (angle_in_degrees < 30) {
						id = 3;
					}
					else if (angle_in_degrees < 45) {
						id = 2;
					}
					else if (angle_in_degrees < 60) {
						id = 1;
					}
					else {
						id = 0;
					}
					

					var l_midX = $scope.panWidth / 2;
					var l_midY = $scope.panHeight / 2;

					if (angle_in_degrees_wall > 90) {
						if (x < ($scope.panWidth / 2)) {
							if ((id + modifier) < 8) {
									id += 1;
							}
							else {
								id = -1;
							}
						}
					}
					else {
						if (x > ($scope.panWidth / 2) ) {
							if ((id + modifier) < 8) {
									id += 1;
							}
							else {
								id = -1;
							}
						}
					}

					posters_id[id + modifier].style.display = '';
					$scope.hidePosters(posters_id, id + modifier);
				}

				l_markerDiv.style.display = "block";
				l_markerDiv.style.left = x + "px";
				l_markerDiv.style.top = y + "px";
				l_markerDiv.style.width = wd + "px";
				l_markerDiv.style.height = ht + "px";
			
				// hide marker when its beyond the maximum distance
				l_markerDiv.style.display = $scope.distance_to_street_reference < $scope.maximumDistance ? "block" : "none";
				// glog("distance = " + Math.floor(this.distance) + " m (" + l_markerDiv.style.display + ") distance scale = " + l_distanceScale + " l_adjustedZoom = " + l_adjustedZoom);

				//document.getElementById("markerInfo").innerHTML = "lat: " + $scope.formatFloat($scope.currentZone.posPersona.lat(), 6) + " lng: " + $scope.formatFloat($scope.currentZone.posPersona.lng(), 6) + " distance: " + Math.floor($scope.distance) + " m";
			}
	}

	$scope.m_convertPointProjection = function (p_pov, p_zoom){
		var l_fovAngleHorizontal = 90 / p_zoom;
		var l_fovAngleVertical = 90 / p_zoom;

		var l_midX = this.panWidth / 2;
		var l_midY = this.panHeight / 2;

		var l_diffHeading = this.sheading - p_pov.heading;
		l_diffHeading = $scope.normalizeAngle(l_diffHeading);
		l_diffHeading /= l_fovAngleHorizontal;

		var l_diffPitch = (p_pov.pitch - this.spitch) / l_fovAngleVertical;

		var x = l_midX + l_diffHeading * this.panWidth;
		var y = l_midY + l_diffPitch * this.panHeight;

		var l_point = new google.maps.Point(x, y);

		return l_point;
	}

	$scope.hidePosters = function(posters_id, id_shown){
		for (var x in posters_id) {
			if (x != id_shown) {
				posters_id[x].style.display = 'none';
			}
		}
	};

	$scope.normalizeAngle = function(a){

		while (a > 180)
		{
			a -= 360;
		}

		while (a < -180)
		{
			a += 360;
		}

		return a;
	};

	$scope.find_angle = function(A,B,C) {
		var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
		var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
		var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
		return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
	};

	$scope.formatFloat = function(n, d){
		var m = Math.pow(10, d);
		return Math.round(n * m, 10) / m;
	};

	$scope.posterFound = function() {

		if($scope.aryMyPosterId.indexOf($scope.currentZone.poster_id) == -1){

			

			var AryObj = {
				user_id   : localStorage.user_id,
				game_id   : localStorage.game_id,
				poster_id : $scope.currentZone.poster_id
			};


			$scope.aryMyPosterId.push($scope.currentZone.poster_id);

			var newAry = {
				'img' : $scope.currentZone.image_default
			};
			switch($scope.aryMyPosterId.length) {
			    case 1:
			        $scope.posterFoundSetValues($scope.aryTextFindPoster[0], newAry);
			        break;
			    case 2:
			       	$scope.posterFoundSetValues($scope.aryTextFindPoster[1], newAry);
			        break;
		        case 3:
		       		$scope.posterFoundCompleteInformation($scope.aryTextFindPoster[2], newAry);
		        break;
		        case 12:
		       		$scope.posterFoundComplete(newAry);
		        break;
			    default:
			    	$scope.posterFoundSetValues($scope.aryTextFindPoster[3], newAry);

			};

			$gamePoster.create(AryObj).then(function(result){



			});	

		}

	};

	$scope.posterFoundSetValues = function(aryFound, aryPush) {
				$scope.titlePosterFound = aryFound.title;
				$scope.descriptionPosterFound = aryFound.description;

				$scope.aryDefaultPosters.splice(0, 1)
				$scope.aryMyPosters.push(aryPush);

				$scope.actionModalOpen('posterFind');
	};

	$scope.posterFoundCompleteInformation = function(aryFound, aryPush) {
				$scope.aryDefaultPosters.splice(0, 1)
				$scope.aryMyPosters.push(aryPush);

				//$scope.actionModalOpen('completeformation');
				$state.go('end');
	};

	$scope.posterFoundComplete = function(aryPush) {
				$scope.aryDefaultPosters.splice(0, 1)
				$scope.aryMyPosters.push(aryPush);
				$scope.actionModalOpen('fin-game');
	};

	$scope.actionCompleteInformation = function() {
			$("#completeformation").openModal();
	};	


	$scope.endgame = function() {
		$scope.actionModalOpen('fin-game');
	};	

	$scope.sharedEndGame = function() {
		FB.login(function(){
		  FB.api('/me/feed', 'post', 
		  	{message: 'Ya estoy participando en Hambre de Lolla Street View Lollapalooza 2016', 'source': 'http://www.hambredelolla.cl/'}, function(response){
		  		$window.location.reload();
		  	}
		   );

		}, {scope: 'publish_actions'});
	};

	$scope.shared = function() {
		FB.login(function(){
		  FB.api('/me/feed', 'post', 
		  	{message: 'Ya estoy participando en Hambre de Lolla Street View Lollapalooza 2016', 'source': 'http://www.hambredelolla.cl/'}
		   );

		}, {scope: 'publish_actions'});
	};	

	$scope.sendInformation = function() {
 		if($scope.user.run != ""){
 			if($scope.user.email != ""){
 				if($scope.user.cellphone != ""){
 					if($scope.user.address != ""){
 						$user.update(localStorage.user_id, $scope.user).then(function(result){
 							$("#completeformation").closeModal();
							$("#success").openModal();
						});	
 					}else{
 						$scope.address = true;
 					}
 				}else{
 					$scope.cellphone = true;
 				}
 			}else{
 					$scope.email = true;
 			}
 		}else{
 				$scope.run = true;
 		}	
	};

	$scope.backToPlayHome = function() {
    	if($("#success").is(':visible')){
    		$("#success").closeModal();
    		$window.location.reload();
    	}else{
	    	$window.location.reload();
    	}
	};
	
	$scope.init();
});