app.controller('SignUpCtrl', [
	function($scope, $location) {
		$scope.user = {
			email: null,
			password: null,
			passwordConfirmation: null
		}
	}
]);