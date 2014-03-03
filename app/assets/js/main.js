/**
 * Declare app
 */
var app = angular.module('Boiler', [ 'ngRoute' ]);

'use strict';

var partial = function(type, page) {
	return 'partials/'+type+'/'+page;
};

app.config(['$routeProvider',
	function($routeProvider) {

		$routeProvider.
			when('/signup', {
				templateUrl: partial('users', 'signup'),
				controller: 'SignUpCtrl'
			}).
			when('/about', {
				templateUrl: partial('static', 'about')
			}).
			otherwise({
				redirectTo: '/'
			})

	}
]);