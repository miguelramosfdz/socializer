'use strict';

// Declare app
var app = angular.module('Boiler', [ 'ngRoute' ]);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		var partial = function(type, page) {
			return 'partials/'+type+'/'+page;
		};

		$routeProvider.
			when('/signup', {
				templateUrl: partial('users', 'signup'),
				controller: 'SignUpCtrl'
			}).
			when('/about', {
				templateUrl: partial('static', 'about')
			}).
			when('/profile', {
				templateUrl: partial('users', 'profile'),
				controller: 'ProfileCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}
]);
