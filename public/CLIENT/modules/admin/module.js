angular.module('app')

.run(function($autoMenu) {
	$autoMenu.add({
		name: 'La Florida',
		url: '/admin/index/1'
	});
	$autoMenu.add({
		name: 'Las Condes',
		url: '/admin/index/2'
	});
	$autoMenu.add({
		name: 'Maipu',
		url: '/admin/index/3'
	});
	$autoMenu.add({
		name: '— Admin',
		url: '/admin'
	});
})


.controller('admin.index', function adminIndex($scope, $flash, LoopBackAuth, Client, sprintf, $poster, $stateParams) {


$scope.geocoder = new google.maps.Geocoder();

$scope.geocodePosition = function(pos) {
  $scope.geocoder.geocode({
	latLng: $scope.pos
  }, function(responses) {
	if (responses && responses.length > 0) {
	  $scope.updateMarkerAddress(responses[0].formatted_address);
	} else {
	  $scope.updateMarkerAddress('Cannot determine address at this location.');
	}
  });
}

$scope.updateMarkerPosition = function(latLng) {
  $scope.info = [
	$scope.latLng.lat(),
	$scope.latLng.lng()
  ].join(', ');
}

$scope.updateMarkerAddress = function(str) {
  $scope.direccion = str;
}

$scope.initialize = function() {
  $scope.latLng = new google.maps.LatLng($scope.getLat(2), $scope.getLng(2));
  $scope.map = new google.maps.Map(document.getElementById('mapCanvas'), {
	zoom: 19,
	center: $scope.latLng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  $scope.positionsGeneral=[];
  $scope.positionsClues=[];
  $scope.markersGeneral=[];
  $scope.markersClues=[];


  //POSICIONES GENERALES
  for(var i=1; i<5; i++) {
	id=i;
	console.log('agregando pa mostrar')
	$scope.positionsGeneral[id] = { lat: parseFloat($scope.getLat(i)), lng: parseFloat($scope.getLng(i)) };
	$scope.markersGeneral[id] = new google.maps.Marker({
	  position: $scope.positionsGeneral[id],
	  title: 'Punto <?php echo nombre(i); ?>',
	  map: $scope.map,
	  draggable: true,
	  icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/'+$scope.ico(i)+'.png'
	});
	$scope.updateMarkerPosition($scope.positionsGeneral[id]);
	$scope.geocodePosition($scope.positionsGeneral[id]);
	google.maps.event.addListener($scope.markersGeneral[id], 'drag', function() {
	  $scope.updateMarkerPosition($scope.markersGeneral[i].getPosition());
	});
	google.maps.event.addListener($scope.markersGeneral[id], 'dragend', function() {
	  $scope.pos=$scope.markersGeneral[i].getPosition();
	  $scope.geocodePosition(pos);
	  $scope.f[i].lat=pos.lat();
	  $scope.f[i].lng=pos.lng();
	});
  }

  //PISTAS SECUNDARIAS
  for(i=2; i<7; i++) {
	id=i;
	$scope.positionsGeneral[id] = { lat: parseFloat($scope.getLat(i)), lng: parseFloat($scope.getLng(i)) };
	$scope.markersClues[id] = new google.maps.Marker({
	  position: $scope.positionsClues[id],
	  title: 'Pista <?php echo i; ?>',
	  map: $scope.map,
	  draggable: true,
	  icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/'+$scope.ico(6)+'.png'
	});
	$scope.updateMarkerPosition($scope.positionsClues[id]);
	$scope.geocodePosition($scope.positionsClues[id]);
	google.maps.event.addListener($scope.markersClues[id], 'drag', function() {
	  $scope.updateMarkerPosition($scope.markersClues[i].getPosition());
	});
	google.maps.event.addListener($scope.markersClues[id], 'dragend', function() {
	  $scope.pos=$scope.markersClues[i].getPosition();
	  $scope.geocodePosition(pos);
	  $scope.f[i].lat=pos.lat();
	  $scope.f[i].lng=pos.lng();
	});
  }
}

$scope.getLat = function (i) {
  switch(i) {
	case 1: return $scope.zone.latitude; break;
	case 2: return $scope.zone.default_clue_latitude; break;
	case 3: return $scope.zone.latitude_line; break;
	case 4: return $scope.zone.latitude_wall_line; break;
  }
}
$scope.getLng = function (i) {
  switch(i) {
	case 1: return $scope.zone.longitude; break;
	case 2: return $scope.zone.default_clue_longitude; break;
	case 3: return $scope.zone.longitude_line; break;
	case 4: return $scope.zone.longitude_wall_line; break;
  }
}
$scope.nombre = function (i) {
  switch(i) {
	case 1: return "Poster"; break;
	case 2: return "Pista"; break;
	case 3: return "Line"; break;
	case 4: return "Wall Line"; break;
  }  
}

$scope.ico = function (i) {
  switch(i) {
	case 1: return "green-dot"; break;
	case 2: return "orange-dot"; break;
	case 3: return "purple-dot"; break;
	case 4: return "blue-dot"; break;
	default: return "red-dot"; break;
  }  
}


//OBTENER INFORMACION DE ZONA E INICIAR
$poster.getById(1).then(function(result){
	var response = JSON.parse(JSON.stringify(result.data));
	$scope.zone = response[0];
	google.maps.event.addDomListener(window, 'load', $scope.initialize);
});	









})
; //EOF