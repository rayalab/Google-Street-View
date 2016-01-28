<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<meta charset="utf8" />
<script type="text/javascript" src="http://maps.google.com/maps/api/js"></script>
<button onclick="location='?zona=3'">Las Condes</button>
<button onclick="location='?zona=2'">Maipu</button>
<button onclick="location='?zona=1'">La Florida</button>

<?php
$m = new mysqli("localhost", "forge", "forge", "forge");
if (!$_GET['zona']) die;
if ($_POST) {

  $m->query(sprintf("UPDATE poster set latitude='%s' where poster_id=%s", $_POST['f_1_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude='%s' where poster_id=%s", $_POST['f_1_lng'], $_POST['id']));

  $m->query(sprintf("UPDATE poster set default_clue_latitude='%s' where poster_id=%s", $_POST['f_2_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set default_clue_longitude='%s' where poster_id=%s", $_POST['f_2_lng'], $_POST['id']));

  $m->query(sprintf("UPDATE poster set latitude_line='%s' where poster_id=%s", $_POST['f_3_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude_line='%s' where poster_id=%s", $_POST['f_3_lng'], $_POST['id']));

  $m->query(sprintf("UPDATE poster set latitude_wall_line='%s' where poster_id=%s", $_POST['f_4_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude_wall_line='%s' where poster_id=%s", $_POST['f_4_lng'], $_POST['id']));
  
  // die(sprintf("<script>location='?zona=%s'</script>", $_POST['id']));
}

$q = $m->query(sprintf("SELECT * from poster where poster_id=%s", $_GET['zona']));
$r = $q->fetch_assoc();

?>


<script type="text/javascript">
var geocoder = new google.maps.Geocoder();

function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('Cannot determine address at this location.');
    }
  });
}

function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
  document.getElementById('address').innerHTML = str;
}

function initialize() {
  var latLng = new google.maps.LatLng(<?php printf($r['latitude']); ?>, <?php printf($r['longitude']); ?>);
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 14,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var positions=[];
  var markers=[];
<?php 
function getLat ($i) {
  global $r;
  switch($i) {
    case 1: return $r['latitude']; break;
    case 2: return $r['default_clue_latitude']; break;
    case 3: return $r['latitude_line']; break;
    case 4: return $r['latitude_wall_line']; break;
  }
}
function getLng ($i) {
  global $r;
  switch($i) {
    case 1: return $r['longitude']; break;
    case 2: return $r['default_clue_longitude']; break;
    case 3: return $r['longitude_line']; break;
    case 4: return $r['longitude_wall_line']; break;
  }
}
function nombre ($i) {
  global $r;
  switch($i) {
    case 1: return "Poster"; break;
    case 2: return "Pista"; break;
    case 3: return "Line"; break;
    case 4: return "Wall Line"; break;
  }  
}

function ico ($i) {
  global $r;
  switch($i) {
    case 1: return "orange-dot"; break;
    case 2: return "pink-dot"; break;
    case 3: return "purple-dot"; break;
    case 4: return "yellow-dot"; break;
  }  
}

for($i=1; $i<5; $i++) { ?>

  id=<?php printf($i); ?>;
  positions[id] = new google.maps.LatLng(<?php printf('%s,%s', getLat($i), getLng($i)); ?>);
  
  markers[id] = new google.maps.Marker({
    position: positions[id],
    title: 'Punto <?php echo nombre($i); ?>',
    map: map,
    draggable: true,
    icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico($i)); ?>.png'
  });

  
  // Update current position info.
  updateMarkerPosition(positions[id]);
  geocodePosition(positions[id]);
  
  // Add dragging event listeners.
  google.maps.event.addListener(markers[id], 'dragstart', function() {
    updateMarkerAddress('Dragging #<?php printf($i); ?>...');
  });
  
  google.maps.event.addListener(markers[id], 'drag', function() {
    updateMarkerPosition(markers[<?php printf($i); ?>].getPosition());
  });
  
  google.maps.event.addListener(markers[id], 'dragend', function() {
    pos=markers[<?php printf($i); ?>].getPosition();
    geocodePosition(pos);
    f_<?php printf($i); ?>_lat.value=pos.lat();
    f_<?php printf($i); ?>_lng.value=pos.lng();
  });

  <?php } ?>



}

// Onload handler to fire off the app.
google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>
<body>
  <style>
  #mapCanvas {
    width: 500px;
    height: 400px;
    float: left;
  }
  #infoPanel {
    float: left;
    margin-left: 10px;
  }
  #infoPanel div {
    margin-bottom: 5px;
  }
  #form {
    margin-top:160px;
  }
  </style>
  
  <div id="mapCanvas"></div>
  <div id="infoPanel">
    <b>Posición:</b>
    <div id="info"></div>
    <b>Dirección:</b>
    <div id="address"></div>
  </div>
  <div id="form">
  <form method="post">
  <input type="hidden" name="id" value="<?php printf($r['poster_id']); ?>">

  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(1)); ?>.png">
  poster:
  <input name="f_1_lat" id="f_1_lat" value="<?php printf($r['latitude']); ?>">,
  <input name="f_1_lng" id="f_1_lng" value="<?php printf($r['longitude']); ?>"><br><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(2)); ?>.png">
  pista:
  <input name="f_2_lat" id="f_2_lat" value="<?php printf($r['default_clue_latitude']); ?>">,
  <input name="f_2_lng" id="f_2_lng" value="<?php printf($r['default_clue_longitude']); ?>"><br><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(3)); ?>.png">
  line:
  <input name="f_3_lat" id="f_3_lat" value="<?php printf($r['latitude_line']); ?>">,
  <input name="f_3_lng" id="f_3_lng" value="<?php printf($r['longitude_line']); ?>"><br><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(4)); ?>.png">
  wall:
  <input name="f_4_lat" id="f_4_lat" value="<?php printf($r['latitude_wall_line']); ?>">,
  <input name="f_4_lng" id="f_4_lng" value="<?php printf($r['longitude_wall_line']); ?>"><br>
  
  <br><input type="submit" value="guardar">

  </form>
  </div>
</body>
</html>
