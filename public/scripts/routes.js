app.config(function ( $routeProvider, $locationProvider ) {

		var show = function (view) {
			return '/templates/' + view;
		}

		$routeProvider.
			when('/', {
				templateUrl: show('static/home')
			}).
			when('/signup', {
				templateUrl: show('users/sign_up')
			}).
			when('/signin', {
				templateUrl: show('users/sign_in')
			}).
			when('/dashboard', {
				templateUrl: show('users/dashboard')
			}).
			when('/account/edit', {
				templateUrl: show('users/edit')
			}).
			otherwise({
				redirectTo: '/'
			})

		// $locationProvider.html5Mode(true);
	}
);