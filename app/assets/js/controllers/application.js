app
	.controller('AppCtrl', function($rootScope, $scope, $location, UserFactory) {
		$scope.main = {
			user: null
		}
	})
	.controller('NavCtrl', function($rootScope, $scope, $location, UserFactory) {
		$scope.user = $rootScope.user;
		$scope.isLoggedIn = $scope.user ? true : false;
	});
