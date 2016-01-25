angular.module('app')

// .run(function($autoMenu) {
// 	$autoMenu.add({name: 'Post', url:'/post'});
// })

.controller('post.index', function postIndex($scope, Post) {

	// Default "findAll"
	//$scope.postList = Post.find();
	
	// Or custom method
	var customFind = Post.customFind();
	customFind
		.$promise
		.then(function(){
			$scope.postList = customFind.posts;
		});

})

.controller('post.new', function postNew($flash, $scope, $location, Post) {

	$scope.post = {};

	$scope.sendPost = function(){
		Post.create($scope.post)
			.$promise
			.then(function(){
				$flash.setMessage('New post added');
				$location.path("/post");
			});
	};

})

.controller('post.edit', function postEdit($flash, $location, $scope, $stateParams, Post) {

	$scope.post = Post.findById({ id: $stateParams.opt1 });

	$scope.sendPost = function(){
		// Could be like this
		$scope.post
			.$save()
			.then(function(){
				$flash.setMessage('Post updated');
			});
		
		// Or also like this to modify update parameters
		// Post.prototype$updateAttributes( { id: $stateParams.opt1 }, $scope.post )
		
	};

})

.controller('post.delete', function postDelete($flash, $stateParams, $location, Post) {

	Post.deleteById($stateParams.opt1)
		.$promise
		.then(function(){
			$flash.setMessage('Post deleted');
			$location.path("/post");
		});

})

; //EOF