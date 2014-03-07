app.controller('SignUpCtrl', [ '$scope', '$location', '$http',
	function($scope, $location, $http) {
		$scope.user = {
			email: null,
			password: null,
			passwordConfirmation: null
		}

		$scope.signUp = function() {
			$http.post('/users')
		}
	}
]);