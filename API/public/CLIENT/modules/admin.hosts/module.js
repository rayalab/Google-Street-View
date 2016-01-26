angular.module('app')

.run(function($autoMenu) {
	$autoMenu.add({
		name: 'Hosts',
		url: '/admin/hosts'
	});
})

.controller('hosts.index', function authSignup($scope, $flash, LoopBackAuth, Client) {

	$scope.clients = Client.find();

	$scope.newClient = {
		'name': '',
		'host': '',
		'db': '',
		'active': true,
		'config': {}
	};

	$scope.add = function() {
		Client.create($scope.newClient)
			.$promise
			.then(function() {
				$flash.setMessage('New client host saved');
				$scope.clients = Client.find();
			});
	};

	$scope.del = function(id) {
		Client.deleteById({
				id: id
			})
			.$promise
			.then(function() {
				$scope.clients = Client.find();
			});
	};

})

; //EOF