app
	.controller('AppCtrl', ['$rootScope','$scope', '$location', '$http',
		function($rootScope, $scope, $location, $http) {
			$http({ method: 'GET', url: '/isLoggedIn' })
				.success(function(data, status, headers, config) {
					$rootScope.user = data;
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});

		}
	])
	.controller('NavCtrl', ['$rootScope','$scope', '$location', '$http',
		function($rootScope, $scope, $location, $http) {
			$scope.user = $rootScope.user;
			$scope.isLoggedIn = $scope.user ? true : false;
		}
	]);
