app.controller('SignUpCtrl', [ '$scope', '$location', '$http',
	function($scope, $location, $http) {
		$scope.user = {
			email: null,
			password: null,
			passwordConfirmation: null
		}

		$scope.signUp = function() {
			$http({ method: 'GET', url:'/users'})
				.success(function(data, status, headers, config) {
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
		}
	}
]);