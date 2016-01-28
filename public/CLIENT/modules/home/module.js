angular.module('app')

.controller('home.index', function homeIndex($stateParams, $flash, $scope, $poster, $clue) {
		
	$scope.full_name = localStorage.full_name;
	$scope.facebook_id = localStorage.facebook_id;
	$scope.defaultImage = "http://vignette2.wikia.nocookie.net/guiltycrown/images/6/64/Ejemplo.png/revision/latest?cb=20120305205546&path-prefix=es";


	// calle  -33.39790772, -70.5823195
	// cartel -33.39775097,-70.58235705
	$scope.gmarkers = [];
	$scope.zoom = 12;
	$scope.slat = localStorage.position_latitude;	
	$scope.slng = localStorage.position_longitude;	
	$scope.sheading = 69.58;
	$scope.spitch = 0;
	$scope.szoom = 1;
	$scope.distance = 0;
	$scope.maximumDistance = 40;
	$scope.panWidth = 800;
	$scope.panHeight = 600;
	$scope.markerWidth = 50;
	$scope.markerHeight = 62;
	$scope.lat =  0;
	$scope.lng =  0;
	$scope.lat_line =  0;
	$scope.lng_line =  0;
	$scope.lat_wall_line =  0;
	$scope.lng_wall_line =  0;
	$scope.currentZone = {};
	$scope.mode='map';
	$scope.testField = "";
	$scope.obj = [];
	$scope.posPersona = new google.maps.LatLng(-33.44560, -70.66033);


	$scope.nextClue = function(category, obj) {

		for (var i=0; i<$scope.gmarkers.length; i++) {
          if ($scope.gmarkers[i].mycategory == category) {
            $scope.gmarkers[i].setVisible(false);
          }
        }

		$clue.getByPosterId(obj.poster_id).then(function(result){
			var response = JSON.parse(JSON.stringify(result.data));
			$scope.map.setCenter(new google.maps.LatLng(obj.default_clue_latitude, obj.default_clue_longitude));
			$scope.map.setZoom($scope.zoom + 4);
			angular.forEach(response, function(item) {

					console.log("latitude : "+ item.latitude);
					console.log("longitude : "+ item.longitude);


					var newClue;
					var firtsCategory = "second_clue";

					//PONER PISTA
					newClue = new google.maps.Marker({
						position: new google.maps.LatLng(item.latitude, item.longitude),
						map: $scope.map,
						icon: 'bundles/img/beachflag.png',
						visible:true,
						draggable: false
					});

					newClue.mycategory = firtsCategory;

					//$scope.gmarkers.push(newClue);

					newClue.addListener('click', function() {
						console.log('setting current poster top ',$scope.currentPoster);
						$scope.m_initPanorama(item.latitude, item.longitude);
						//$scope.clickClue(item, firtsCategory);
						/*$scope.m_initPanorama();*/
					});
				});
		});	


	};


	$scope.clickClue = function(item, firtsCategory) {
		$scope.title = item.default_clue_title;
		$scope.description = item.default_clue_description;
		$scope.category = firtsCategory;
		$scope.obj      = item;
		$scope.$apply();
	   $('#modal1').openModal();
		
	};


	//cachear ubicaciones de banderas y posters
	$scope.init = function() {
		$poster.getAll().then(function(result){
			var response = JSON.parse(JSON.stringify(result.data));
			$scope.aryPoster = response;
			$scope.main_map_init();
		});	
	};

	$scope.main_map_init = function (){
		var div_main_map = document.getElementById("div_main_map");
	    $scope.map = new google.maps.LatLng(-33.44560, -70.66033);

		var mapOptions =
		{
			center: $scope.map,
			zoom: $scope.zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scaleControl: true,
			scrollwheel: false,
			draggable: false,
			disableDefaultUI: true,
			mapTypeControl: false
		};

		$scope.map = new google.maps.Map(div_main_map, mapOptions);


		//colocar banderas y posters
		$scope.posters = [];
		angular.forEach($scope.aryPoster, function(item) {
			var newFlag;
			var firtsCategory = "firts_clue";

			//PONER BANDERA
			newFlag = new google.maps.Marker({
				position: new google.maps.LatLng(item.default_clue_latitude, item.default_clue_longitude),
				map: $scope.map,
				title : item.default_clue_title,
				icon: 'bundles/img/beachflag.png',
				visible:true,
				draggable: false
			});
			newFlag.mycategory = firtsCategory;

			$scope.gmarkers.push(newFlag);

			newFlag.addListener('click', function() {
				console.log('setting current poster to ',item);
				$scope.currentZone = item;
				console.log(item);
				$scope.clickClue(item, firtsCategory);
				/*$scope.m_initPanorama();*/
			});

			newFlag.addListener($scope.map,'zoom_changed',function () {
				// console.log($scope.map.getZoom());
			});
		});


		// $scope.m_initPanorama();
	};



	/**
	 * Start a StreetView in the #panDiv element
	 * 
	 * @return {[type]} [description]
	 */
	$scope.m_initPanorama = function (clue_latitude, clue_longitude){
		var visible = false;
		var l_panDiv = document.getElementById("panDiv");
		$scope.mode = 'street';
		$scope.$apply();

		$scope.currentZone.default_clue_latitude = clue_latitude;
		$scope.currentZone.default_clue_longitude = clue_longitude;
		//SITUAR PERSONA Y COLOCAR POSTER
		$scope.currentZone.posPersona = new google.maps.LatLng($scope.currentZone.default_clue_latitude, $scope.currentZone.default_clue_longitude);
		$scope.currentZone.posPoster = new google.maps.LatLng($scope.currentZone.latitude,$scope.currentZone.longitude);
		$scope.currentZone.posReference = new google.maps.LatLng($scope.currentZone.latitude,$scope.currentZone.longitude);
  		
		$scope.currentZone.images = {
			foto_001 : "bundles/img/posters/001.png",
			foto_002 : "bundles/img/posters/002.png",
			foto_003 : "bundles/img/posters/003.png",
			foto_004 : "bundles/img/posters/004.png",
			foto_005 : "bundles/img/posters/005.png",
			foto_006 : "bundles/img/posters/006.png",
			foto_007 : "bundles/img/posters/007.png",
			foto_008 : "bundles/img/posters/008.png",
			foto_009 : "bundles/img/posters/009.png"
		};
		$scope.$apply();



		// controls can be hidden here to prevent the position being changed by the user
		var l_panOptions =
		{	
	    	linksControl: false,
	        panControl: false,
	        enableCloseButton: false,
			zoomControl: false,
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
		});
	}




	/**
	 * Show and/or move posters accordingly with camera position
	 * @return {[type]} [description]
	 */
	$scope.m_updateMarker = function () {
			console.log('m_updateMarker');
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


				console.log('Posicion persona: ' + $scope.currentZone.posPersona.lat() + " ; " + $scope.currentZone.posPersona.lng());
				console.log('$scope.currentZone.line: ' + $scope.currentZone.latitude_line + " ; " + $scope.currentZone.longitude_line);
				console.log('$scope.currentZone.wall_line: ' + $scope.currentZone.latitude_wall_line + " ; " + $scope.currentZone.longitude_wall_line);


				var angle_in_radians = $scope.find_angle({'x': $scope.currentZone.posPersona.lat(), 'y': $scope.currentZone.posPersona.lng()}, {'x': $scope.lat, 'y': $scope.lng}, {'x': $scope.currentZone.latitude_line, 'y': $scope.currentZone.longitude_line});
				var angle_in_degrees = angle_in_radians * (180/3.1415);
				//console.log('angle: ' + angle_in_degrees);

				var angle_in_radians_wall = $scope.find_angle({'x': $scope.currentZone.posPersona.lat(), 'y': $scope.currentZone.posPersona.lng()}, {'x': $scope.lat, 'y': $scope.lng}, {'x': $scope.currentZone.latitude_wall_line, 'y': $scope.currentZone.longitude_wall_line});
				var angle_in_degrees_wall = angle_in_radians_wall * (180/3.1415);
				//console.log('angle wall: ' + angle_in_degrees_wall);

	   

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

				console.log('angle_in_degrees: ' + angle_in_degrees + " ; angle_in_degrees_wall: " + angle_in_degrees_wall);
				
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

				document.getElementById("markerInfo").innerHTML = "lat: " + $scope.formatFloat($scope.currentZone.posPersona.lat(), 6) + " lng: " + $scope.formatFloat($scope.currentZone.posPersona.lng(), 6) + " distance: " + Math.floor($scope.distance) + " m";
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
	}

	$scope.find_angle = function(A,B,C) {
		var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
		var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
		var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
		return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
	}

	$scope.formatFloat = function(n, d){
		var m = Math.pow(10, d);
		return Math.round(n * m, 10) / m;
	}

	$scope.findPoster = function(poster_id) {

		var aryObj = {
			poster_id   : poster_id,
			game_id   	: game.game_id,
			user_id     : usr.user_id
		};

	
	}
	$scope.init();
});