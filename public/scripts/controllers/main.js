app.controller("MainCtrl",
	function($scope, $rootScope, $location, Auth, User) {

		$scope.loadAuth = function () {
			Auth.signedin()
				.success(function(data) {
					$scope.user = data;
					$scope.isSignedIn = true;
				});
		}

		$scope.signUp = function () {
			$http
				.post('/signup', { user: $scope.user })
				.success(function ( data, status, headers, config ) {
					$scope.loadAuth();
					$location.path('/');
				})
				.error(function ( data, status, headers, config ) {
					debugger;
				})
		}

		$scope.signIn = function () {
			Auth.signin({
				username: $scope.user.username,
				password: $scope.user.password
			})
			.success(function (data, status, headers, config) {
        $scope.loadAuth();
        $location.path('/');
			})
			.error(function (data, status, headers, config) {
				$('.error').fadeIn(500).fadeOut(500);
				$scope.message = data.message;
			})
		}

		$scope.signOut = function() {
			Auth.signOut()
				.success(function(data) {
					$scope.user = {};
					$scope.isSignedIn = false;
					$location.path('/');
				})
		}

		$rootScope.$on('$routeChangeStart', function() {
			if ($location.url() === '/signin' && $scope.isSignedIn) {
				$location.path('/');
			} else if ($location.url() === '/signup' && $scope.isSignedIn) {
				$location.path('/');
			}
		});

		$scope.loadAuth();
});