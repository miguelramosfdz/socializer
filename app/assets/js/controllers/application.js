app
	.controller('AppCtrl', function($rootScope, $scope, $location, $http) {
		$http({ method: 'GET', url: '/isLoggedIn' })
			.success(function(data, status, headers, config) {
				$rootScope.user = data;
			})
			.error(function(data, status, headers, config) {
				console.log(data);
			});
	})
	.controller('NavCtrl', function($rootScope, $scope, $location, $http, UserFactory) {
		UserFactory.authenticate();
		$scope.user = $rootScope.user;
		$scope.isLoggedIn = $scope.user ? true : false;
	});
