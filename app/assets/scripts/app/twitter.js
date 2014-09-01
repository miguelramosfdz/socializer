define(['backbone'], function(Backbone) {
	"use strict";
	
	var $scope = {};
	$scope.geocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?';
	$scope.sensor = '&sensor=false';
	$scope.query = '';
	$scope.address = '';
	$scope.radius = '';
	
	return {
		searchTwitter: function() {
			var address = 'address='+$scope.address;

			$.get(geocodeUrl+address+sensor, function(data) {
					var location = data.results[0].geometry.location;
					$.post('/twitter/search', {
							query: $scope.query,
							geo: [location.lat,location.lng,$scope.radius+'mi'].join(',')
						}, function(data) {
							$scope.tweets = data.tweets.statuses;
							console.log(data);
						}, function(data) {

						});
				});
		}
	};

});