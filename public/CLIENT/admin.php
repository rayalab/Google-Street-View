<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<meta charset="utf8" />
<script type="text/javascript" src="http://maps.google.com/maps/api/js"></script>

<button onclick="location='?zona=3'">Las Condes</button>
<button onclick="location='?zona=2'">Maipu</button>
<button onclick="location='?zona=1'">La Florida</button>
<button onclick="verCiudad()'">ciudad</button>
<button onclick="verPista()'">pista</button>
<?php
$m = is_dir("/etc")?new mysqli("localhost","forge","forge","forge"):new mysqli("localhost","RICHI","forge","forge");
if (!$_GET['zona']) die;
if ($_POST) {

  //GUARDAR POSICIONES PRINCIPALES
  $m->query(sprintf("UPDATE poster set latitude='%s' where poster_id=%s", $_POST['f_1_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude='%s' where poster_id=%s", $_POST['f_1_lng'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set default_clue_latitude='%s' where poster_id=%s", $_POST['f_2_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set default_clue_longitude='%s' where poster_id=%s", $_POST['f_2_lng'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set latitude_line='%s' where poster_id=%s", $_POST['f_3_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude_line='%s' where poster_id=%s", $_POST['f_3_lng'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set latitude_wall_line='%s' where poster_id=%s", $_POST['f_4_lat'], $_POST['id']));
  $m->query(sprintf("UPDATE poster set longitude_wall_line='%s' where poster_id=%s", $_POST['f_4_lng'], $_POST['id']));

  //GUARDAR POSICIONES PISTAS MENORES
  for ($i=2; $i<=6; $i++) {
    $m->query(sprintf("UPDATE clue_poster set latitude='%s' where clue_poster_id=%s", $_POST['p_'.$i.'_lat'], $_POST['clues_ids_'.$i]));
    $m->query(sprintf("UPDATE clue_poster set longitude='%s' where clue_poster_id=%s", $_POST['p_'.$i.'_lng'], $_POST['clues_ids_'.$i]));
  }
}

//BUSCAR POSICIONES PRINCIPALES
$q = $m->query(sprintf("SELECT * from poster where poster_id=%s", $_GET['zona']));
$r = $q->fetch_assoc();

//BUSCAR POSICIONES PISTAS MENORES
$q = $m->query(sprintf("SELECT * from clue_poster where poster_id=%s", $_GET['zona']));
$i=2;
$p = [];
while($pp=$q->fetch_assoc()) {
  $p[$i]['id'] = ($pp['clue_poster_id']);
  $p[$i]['latitude'] = ($pp['latitude']);
  $p[$i]['longitude'] = ($pp['longitude']);
  $i++;
}
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

function verCiudad() {
  map.setCenter(new google.maps.LatLng(-33.44560, -70.66033));
}
var map;
function initialize() {
  var latLng = new google.maps.LatLng(<?php printf($r['default_clue_latitude']); ?>, <?php printf($r['default_clue_longitude']); ?>);
  map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 17,
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
    case 2: return "yellow-dot"; break;
    case 3: return "purple-dot"; break;
    case 4: return "green-dot"; break;
    default: return "red-dot"; break;
  }  
}


//POSICIONES GENERALES
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
  updateMarkerPosition(positions[id]);
  geocodePosition(positions[id]);
  google.maps.event.addListener(markers[id], 'drag', function() {
    updateMarkerPosition(markers[<?php printf($i); ?>].getPosition());
  });
  google.maps.event.addListener(markers[id], 'dragend', function() {
    pos=markers[<?php printf($i); ?>].getPosition();
    geocodePosition(pos);
    f_<?php printf($i); ?>_lat.value=pos.lat();
    f_<?php printf($i); ?>_lng.value=pos.lng();
  });
<?php }


//PISTAS SECUNDARIAS
for($i=2; $i<7; $i++) { ?>
  id=<?php printf($i); ?>;
  positions[id] = new google.maps.LatLng(<?php printf('%s,%s', $p[$i]['latitude'], $p[$i]['longitude']); ?>);
  markers[id] = new google.maps.Marker({
    position: positions[id],
    title: 'Pista <?php echo $i; ?>',
    map: map,
    draggable: true,
    icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(6)); ?>.png'
  });
  updateMarkerPosition(positions[id]);
  geocodePosition(positions[id]);
  google.maps.event.addListener(markers[id], 'drag', function() {
    updateMarkerPosition(markers[<?php printf($i); ?>].getPosition());
  });
  google.maps.event.addListener(markers[id], 'dragend', function() {
    pos=markers[<?php printf($i); ?>].getPosition();
    geocodePosition(pos);
    p_<?php printf($i); ?>_lat.value=pos.lat();
    p_<?php printf($i); ?>_lng.value=pos.lng();
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
    width: 900px;
    height: 600px;
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
    border:1px solid;
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
  pista#1:
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

  <!-- clues -->  

  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(5)); ?>.png">
  pista#2:
  <input type="hidden" name="clues_ids_2" value="<?php printf($p[2]['id']); ?>">
  <input name="p_2_lat" id="p_2_lat" value="<?php printf($p[2]['latitude']); ?>">,
  <input name="p_2_lng" id="p_2_lng" value="<?php printf($p[2]['longitude']); ?>"><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(5)); ?>.png">
  pista#3:
  <input type="hidden" name="clues_ids_3" value="<?php printf($p[3]['id']); ?>">
  <input name="p_3_lat" id="p_3_lat" value="<?php printf($p[3]['latitude']); ?>">,
  <input name="p_3_lng" id="p_3_lng" value="<?php printf($p[3]['longitude']); ?>"><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(5)); ?>.png">
  pista#4:
  <input type="hidden" name="clues_ids_4" value="<?php printf($p[4]['id']); ?>">
  <input name="p_4_lat" id="p_4_lat" value="<?php printf($p[4]['latitude']); ?>">,
  <input name="p_4_lng" id="p_4_lng" value="<?php printf($p[4]['longitude']); ?>"><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(5)); ?>.png">
  pista#5:
  <input type="hidden" name="clues_ids_5" value="<?php printf($p[5]['id']); ?>">
  <input name="p_5_lat" id="p_5_lat" value="<?php printf($p[5]['latitude']); ?>">,
  <input name="p_5_lng" id="p_5_lng" value="<?php printf($p[5]['longitude']); ?>"><br>
  
  <img style="float:left" width="20" src="http://www.google.com/intl/en_us/mapfiles/ms/micons/<?php printf(ico(5)); ?>.png">
  pista#6:
  <input type="hidden" name="clues_ids_6" value="<?php printf($p[6]['id']); ?>">
  <input name="p_6_lat" id="p_6_lat" value="<?php printf($p[6]['latitude']); ?>">,
  <input name="p_6_lng" id="p_6_lng" value="<?php printf($p[6]['longitude']); ?>"><br>
  

  <br><input type="submit" value="guardar">

  </form>
  </div>
</body>
</html>
