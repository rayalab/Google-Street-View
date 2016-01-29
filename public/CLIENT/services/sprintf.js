angular.module("sprintfService", [])
  .factory("sprintf", ['$window', '$http', '$location',
	function($window, $http, $location) {

	  return function() {
		  var args = arguments,
		  string = args[0],
		  i = 1;
		  return string.replace(/%((%)|s|d)/g, function (m) {
			  // m is the matched format, e.g. %s, %d
			  var val = null;
			  if (m[2]) {
				  val = m[2];
			  } else {
				  val = args[i];
				  // A switch statement so that the formatter can be extended. Default is %s
				  switch (m) {
					  case '%d':
						  val = parseFloat(val);
						  if (isNaN(val)) {
							  val = 0;
						  }
						  break;
				  }
				  i++;
			  }
			  return val;
		  });

		}

		
	  }
  ]);
