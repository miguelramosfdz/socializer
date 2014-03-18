app
	.controller('SignUpCtrl', [ '$scope', '$location', '$http', 'UserFactory',
		function($scope, $location, $http) {

			$scope.user = {
				email: null,
				password: null,
				passwordConfirmation: null
			};

			$scope.signUp = function() {
				$http({ method: 'POST', url:'/api/user', data: $scope.user })
					.success(function(data, status, headers, config) {
						console.log(data);
					})
					.error(function(data, status, headers, config) {
						console.log(data);
					});
			};

		}
	])
	.controller('ProfileCtrl', ['$rootScope', '$scope', '$location', '$http',
		function($rootScope, $scope, $location, $http) {
			$scope.meow = $rootScope.user;
		}
	]);
