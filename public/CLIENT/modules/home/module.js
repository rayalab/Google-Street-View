angular.module('app')

.controller('home.index', function homeIndex($stateParams, $flash, $scope, $poster) {
		
	$scope.full_name = localStorage.full_name;
	$scope.facebook_id = localStorage.facebook_id;
	$scope.defaultImage = "http://vignette2.wikia.nocookie.net/guiltycrown/images/6/64/Ejemplo.png/revision/latest?cb=20120305205546&path-prefix=es";
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
	$scope.posterId =  0;-
	$scope.lat =  0;
	$scope.lng =  0;
	$scope.lat_line =  0;
	$scope.lng_line =  0;
	$scope.lat_wall_line =  0;
	$scope.lng_wall_line =  0;

	$scope.obj = [];
	$scope.titleClue = "";
	$scope.streetPt = new google.maps.LatLng(-33.44560, -70.66033);


	$scope.goStreet = function(scope) {

		console.log(scope);
		for (var i=0; i<$scope.gmarkers.length; i++) {
          if ($scope.gmarkers[i].mycategory == category) {
            $scope.gmarkers[i].setVisible(false);
          }
        }

		$scope.marker = new google.maps.Marker({
	            position: new google.maps.LatLng($scope.obj.second_clue_latitude, $scope.obj.second_clue_longitude),
	            map: $scope.map,
	            title : $scope.obj.second_clue_title,
	            icon: 'bundles/img/beachflag.png',
	            visible:true,
	            draggable: false
	      });
	};

	$scope.clickClue = function(obj) {
		console.log(obj.first_clue_title);
		$scope.titleCluee = obj.first_clue_title;
		if($scope.titleCluee == obj.first_clue_title){
		   $('#modal1').openModal();
		}
	};

	$scope.init = function() {
	  	$poster.getAll().then(function(result){
	  		var response = JSON.parse(JSON.stringify(result.data));
	  		$scope.aryPoster = response;
	
	  		/*$scope.posterId =  response.poster_id;
	  		$scope.lat =  response.latitude;
	  		$scope.lng =  response.longitude;
	  		$scope.lat_line =  response.latitude_line;
	  		$scope.lng_line =  response.longitude_line;
	  		$scope.lat_wall_line =  response.latitude_wall_line;
	  		$scope.lng_wall_line =  response.longitude_wall_line;
		    $scope.aryImg = {

		    	foto_001 : "bundles/img/posters/001.png",
		    	foto_002 : "bundles/img/posters/002.png",
		    	foto_003 : "bundles/img/posters/003.png",
		    	foto_004 : "bundles/img/posters/004.png",
		    	foto_005 : "bundles/img/posters/005.png",
		    	foto_006 : "bundles/img/posters/006.png",
		    	foto_007 : "bundles/img/posters/007.png",
		    	foto_008 : "bundles/img/posters/008.png",
		    	foto_009 : "bundles/img/posters/009.png"
	    	};*/

  		    $scope.pt = new google.maps.LatLng(-33.44560, -70.66033);
    		/*$scope.pt_street_reference = new google.maps.LatLng($scope.lat_line, $scope.lng_line);*/

			$scope.main_map_init();
		});	
	};

    $scope.main_map_init = function (){
	    var div_main_map = document.getElementById("div_main_map");

	    var mapOptions =
	    {
	        center: $scope.pt,
	        zoom: $scope.zoom,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scaleControl: true,
	        scrollwheel: false,
	        draggable: false,
	        disableDefaultUI: true,
	        mapTypeControl: false
	    };

	    $scope.map = new google.maps.Map(div_main_map, mapOptions);


	    angular.forEach($scope.aryPoster, function(item) {
	    	console.log(item);
			$scope.marker = new google.maps.Marker({
		            position: new google.maps.LatLng(item.first_clue_latitude, item.first_clue_longitude),
		            map: $scope.map,
		            title : item.first_clue_title,
		            icon: 'bundles/img/beachflag.png',
		            visible:true,
		            draggable: false
		      });
			$scope.marker.mycategory = "firts";
			$scope.gmarkers.push($scope.marker);

			$scope.marker.addListener('click', function() {
				var longitude = item.first_clue_longitude;
				var latitude = item.first_clue_latitude;

				var obj = {
					first_clue_longitude : item.first_clue_longitude,
					first_clue_latitude : item.first_clue_latitude,	
					first_clue_title    : item.first_clue_title,
					second_clue_latitude : item.second_clue_latitude,	
					second_clue_longitude : item.second_clue_longitude,
					second_clue_title    : item.second_clue_title,
					category    : $scope.marker.mycategory	
				}

			    $scope.map.setCenter(new google.maps.LatLng(item.first_clue_latitude, item.first_clue_longitude));
		    	$scope.map.setZoom($scope.zoom + 3);

		    	$scope.clickClue(obj);
			  });

     	 });

        /*$scope.m_initPanorama();*/
	};

	$scope.m_initPanorama = function (){
	    var visible = false;
	    var l_panDiv = document.getElementById("panDiv");

	    // controls can be hidden here to prevent the position being changed by the user
	    var l_panOptions =
	    {
	        // zoomControl: false,
	        // linksControl: false
	    };

	    l_panOptions.position = $scope.streetPt;
	    l_panOptions.pov =
	    {
	        heading: $scope.sheading,
	        pitch: $scope.spitch,
	        zoom: $scope.szoom
	    };

	    $scope.pan = new google.maps.StreetViewPanorama(l_panDiv, l_panOptions);

	    $scope.map.setStreetView($scope.pan);

	    // event handlers    
	    google.maps.event.addListener($scope.pan, 'pov_changed', function ()
	    {
	        //console.log('pov_changed');
	        $scope.m_updateMarker();
	    });

	    google.maps.event.addListener($scope.pan, 'zoom_changed', function ()
	    {
	        //console.log('zoom_changed');
	        $scope.m_updateMarker();
	    });

	    google.maps.event.addListener($scope.pan, 'position_changed', function ()
	    {
	        //console.log('position_changed');
	        $scope.streetPt = $scope.pan.getPosition();
	        $scope.map.setCenter($scope.streetPt);

	        $scope.m_updateMarker();
	    });
	}

	$scope.m_updateMarker = function () {
		    var l_pov = $scope.pan.getPov();
		    if (l_pov)
		    {
		        var l_zoom = $scope.pan.getZoom();

		        // scale according to street view zoom level
		        var l_adjustedZoom = Math.pow(2, l_zoom) / 2;


		        // recalculate icon heading and pitch now
		        $scope.sheading = google.maps.geometry.spherical.computeHeading($scope.streetPt, $scope.pt)
		        $scope.distance = google.maps.geometry.spherical.computeDistanceBetween($scope.streetPt, $scope.pt);

		        $scope.distance_to_street_reference = google.maps.geometry.spherical.computeDistanceBetween($scope.streetPt, $scope.pt_street_reference);

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


		        var angle_in_radians = $scope.find_angle({'x': $scope.streetPt.lat(), 'y': $scope.streetPt.lng()}, {'x': $scope.lat, 'y': $scope.lng}, {'x': $scope.lat_line, 'y': $scope.lng_line});
		        var angle_in_degrees = angle_in_radians * (180/3.1415);
		        //console.log('angle: ' + angle_in_degrees);

		        var angle_in_radians_wall = $scope.find_angle({'x': $scope.streetPt.lat(), 'y': $scope.streetPt.lng()}, {'x': $scope.lat, 'y': $scope.lng}, {'x': $scope.lat_wall_line, 'y': $scope.lng_wall_line});
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

		        document.getElementById("markerInfo").innerHTML = "lat: " + $scope.formatFloat($scope.streetPt.lat(), 6) + " lng: " + $scope.formatFloat($scope.streetPt.lng(), 6) + " distance: " + Math.floor($scope.distance) + " m";
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