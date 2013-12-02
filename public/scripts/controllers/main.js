app.controller("MainCtrl",
	function($scope, $rootScope, $location, $http, Auth) {

		$scope.newUser = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		};

		$scope.existingUser = {
			username: '',
			password: ''
		};

		$scope.flashMessage = function (message) {
				$('.error').fadeIn(500).fadeOut(500);
				$scope.message = message;
		};

		$scope.loadAuth = function () {
			Auth.signedin()
				.success(function(data) {
						$scope.user = data;
						$scope.isSignedIn = true;
				});
		};

		$scope.signUp = function () {
			$http
				.post('/signup', { user: $scope.newUser })
				.success(function ( data, status, headers, config ) {
					$scope.loadAuth();
					$location.path('/');
				})
				.error(function ( data, status, headers, config ) {
					$scope.flashMessage(data.message);
				})
		};

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
				$scope.flashMessage(data.message);
			})
		}

		$scope.signOut = function() {
			Auth.signOut()
				.success(function(data) {
					$scope.user = {};
					$scope.isSignedIn = false;
					$location.path('/');
				})
				.error(function(data) {
					$scope.flashMessage(data.message);
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