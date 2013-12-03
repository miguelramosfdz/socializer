app.config(function ( $routeProvider, $locationProvider ) {

		var show = function (view) {
			return '/templates/' + view;
		}

		$routeProvider.
			when('/', {
				templateUrl: show('static/home')
			}).
			when('/twitter', {
				templateUrl: show('stats/twitter')
			}).
			otherwise({
				redirectTo: '/'
			})

		// $locationProvider.html5Mode(true);
	}
);