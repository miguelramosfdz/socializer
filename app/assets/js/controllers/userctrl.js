app.controller('SignUpCtrl', [ '$scope', '$location',
	function($scope, $location) {
		$scope.user = {
			email: null,
			password: null,
			passwordConfirmation: null
		}
	}
]);