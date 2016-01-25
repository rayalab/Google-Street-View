angular.module('app')

.controller('home.index', function homeIndex($stateParams, $flash, $scope, $poster, $track) {
		
	console.log(localStorage);
	$scope.full_name = localStorage.full_name;
	$scope.facebook_id = localStorage.facebook_id;


	$scope.defaultImage = "http://vignette2.wikia.nocookie.net/guiltycrown/images/6/64/Ejemplo.png/revision/latest?cb=20120305205546&path-prefix=es";

	$scope.zoom = 0;
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

	$scope.clickTrack = function(id) {
		console.log('$scope.clickTrack');
		console.log($scope.trackTitle);

	   $('#modal1').openModal();
	};



 	$scope.actionChangeView = function() {
 		if($scope.active){
 			$scope.active = false;
 		}else{
 			$scope.active = true;
 		}
		$scope.m_initPanorama();
		$scope.streetPt = $scope.pan.getPosition();
		$scope.map.setCenter($scope.streetPt);
		$scope.m_updateMarker();
	};

  	$poster.getAll().then(function(result){
  		var response = JSON.parse(JSON.stringify(result.data[0]));
  		console.log(response.latitude);
  		$scope.posterId =  response.poster_id;
  		$scope.lat =  response.latitude;
  		$scope.lng =  response.longitude;
  		$scope.lat_line =  response.latitude_line;
  		$scope.lng_line =  response.longitude_line;
  		$scope.lat_wall_line =  response.latitude_wall_line;
  		$scope.lng_wall_line =  response.longitude_wall_line;


  		//generate maps
	    $scope.pt = new google.maps.LatLng($scope.lat, $scope.lng);
	    $scope.pt_street_reference = new google.maps.LatLng($scope.lat_line, $scope.lng_line);

	    $scope.aryImg = {

	    	foto_001 : response.image_1,
	    	foto_002 : response.image_2,
	    	foto_003 : response.image_3,
	    	foto_004 : response.image_4,
	    	foto_005 : response.image_5,
	    	foto_006 : response.image_6,
	    	foto_007 : response.image_7,
	    	foto_008 : response.image_8,
	    	foto_009 : response.image_9
	    };

	    $track.getTracksByPoster($scope.posterId).then(function(result){
	    	if(result.data){
	    		$scope.track = result.data; 
	    		$scope.m_initMap();
	    	}else{
	    		$scope.m_initMap();
	    	}
		});	


	});	
	


    $scope.m_initMap = function (){
	    var mapDiv = document.getElementById("mapDiv");

	    var mapOptions =
	    {
	        center: $scope.pt,
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scaleControl: true,
	        mapTypeControl: false
	    };

	    $scope.map = new google.maps.Map(mapDiv, mapOptions);

        angular.forEach($scope.track, function(item) {
			$scope.marker = new google.maps.Marker({
		            position: new google.maps.LatLng(item.latitude, item.longitude),
		            map: $scope.map,
		            title : item.title,
		            icon: 'bundles/img/beachflag.png',
		            visible:true
		      });

			$scope.marker.addListener('click', function() {

				$scope.trackTitle = item.title;
				console.log($scope.trackTitle);
			    $scope.clickTrack(item.poster_id)
			  });
     	 });

        $scope.m_initPanorama();
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

		userPosterServices.setNew(aryObj).then(function(result){
			$scope.defaultImage = result.data.poster;
		});	
    	
	}

});