app
	.controller('SignUpCtrl', [ '$scope', '$location', '$http', 'UserFactory',
		function($scope, $location, $http) {

			$scope.user = {
				email: null,
				password: null,
				passwordConfirmation: null
			};

			UserFactory.signUp($scope.user);
		}
	])
	.controller('ProfileCtrl', ['$rootScope', '$scope', '$location', '$http',
		function($rootScope, $scope, $location, $http) {

		}
	]);
