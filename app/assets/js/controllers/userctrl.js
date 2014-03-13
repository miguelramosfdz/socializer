app.controller('SignUpCtrl', [ '$scope', '$location', '$http',
	function($scope, $location, $http) {

		$scope.user = {
			email: null,
			password: null,
			passwordConfirmation: null
		};

		$scope.signUp = function() {
			$http({ method: 'POST', url:'/users', data: $scope.user })
				.success(function(data, status, headers, config) {
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
		};

		$scope.signUpFacebook = function() {
			$http({ method: 'GET', url:'/auth/facebook'})
				.success(function(data, status, headers, config) {
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
		};

		$scope.signUpTwitter = function() {
			$http({ method: 'GET', url:'/auth/twitter' })
				.success(function(data, status, headers, config) {
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
		};

	}
]);