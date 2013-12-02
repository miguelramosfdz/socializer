"use strict";

app.controller("MainCtrl",
	function($scope, $rootScope, $location, $http, Auth) {

		$scope.newUser = {
			username: "",
			email: "",
			password: "",
			passwordConfirmation: ""
		};

		$scope.existingUser = {
			username: "",
			password: ""
		};

		$scope.flashMessage = function (message) {
				$(".error").fadeIn(500).fadeOut(500);
				$scope.message = message;
		};

		$scope.loadAuth = function () {
			Auth.signedin()
				.success(function(data) {
						if (data === "false") {
							$scope.isSignedIn = false;
						} else {
							$scope.user = data;
							$scope.isSignedIn = true;
						}
						$('.nav-menu').fadeIn(900);
				});
		};

		$scope.signUp = function () {
			$http
				.post("/signup", { user: $scope.newUser })
				.success(function ( data, status, headers, config ) {
					$scope.loadAuth();
					$('.signup').remove();
					$('.signin').fadeOut(500, function () {
						$(this).remove();
					});
				})
				.error(function ( data, status, headers, config ) {
					$scope.flashMessage(data.message);
				});
		};

		$scope.signIn = function () {
			Auth.signin({
				username: $scope.existingUser.username,
				password: $scope.existingUser.password
			})
			.success(function (data, status, headers, config) {
        $scope.loadAuth();
        $location.path("#/");
				$('.signup').remove();
				$('.signin').fadeOut(500, function () {
					$(this).remove();
				});
			})
			.error(function (data, status, headers, config) {
				$scope.flashMessage(data.message);
			})
		}

		$scope.showSignUpModal = function() {
			$('.signin').fadeOut(500);
			$('.signup').fadeIn(1500);
		};

		$scope.showSignInModal = function() {
			$('.signup').fadeOut(500);
			$('.signin').fadeIn(1500);
		};

		$scope.signOut = function() {
			Auth.signOut()
				.success(function(data) {
					$scope.user = {};
					$scope.isSignedIn = false;
				})
				.error(function(data) {
					$scope.flashMessage(data.message);
				})
		}

		$rootScope.$on("$routeChangeStart", function() {
    	if ($location.url() === "/signin" && $scope.isSignedIn) {
				$location.path("#/");
			} else if ($location.url() === "/signup" && $scope.isSignedIn) {
				$location.path("#/");
			}
		});

		$scope.loadAuth();

		// debugger;
});