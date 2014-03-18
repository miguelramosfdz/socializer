app
	.controller('SignUpCtrl', function($scope, $location, $http, UserFactory) {
			$scope.user = {
				email: null,
				password: null,
				passwordConfirmation: null
			};
			UserFactory.signUp($scope.user);
	})
	.controller('ProfileCtrl', function($rootScope, $scope, $location, $http) {

	});
