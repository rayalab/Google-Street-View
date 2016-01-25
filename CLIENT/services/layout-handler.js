angular.module("layoutHandler", [])

.factory("$layoutHandler", function() {

	return {
		getLayout: function() {
			var layoutName = 'default';
			var hostname = window.location.hostname;

			function checkIsIPV4(entry) {
				var blocks = entry.split(".");
				if (blocks.length === 4) {
					return blocks.every(function(block) {
						if (parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255) {
							return true;
						} else {
							return false;
						}
					});
				}
				return false;
			}

			if (hostname !== "localhost" || checkIsIPV4(hostname) === true) {
				layoutName = hostname.replace(/\./g, '-');
			}

			return layoutName;
		}
	};

})

; // EOF
