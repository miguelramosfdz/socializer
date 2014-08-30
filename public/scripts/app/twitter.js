"use strict";

app.controller('TwitterCtrl', function($scope, $http) {

	$scope.query = '';
	$scope.address = '';
	$scope.radius = '';

	var geocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?';
	var sensor = '&sensor=false';

	// $( "#radius" ).keyup(function() {
	//   $(this).val($scope.radius + ' miles');
	// });

	$scope.searchTwitter = function() {
		var address = 'address='+$scope.address;

		$http
			.get(geocodeUrl+address+sensor)
			.success(function(data) {
				var location = data.results[0].geometry.location;
				$http
					.post('/twitter/search', {
						query: $scope.query,
						geo: [location.lat,location.lng,$scope.radius+'mi'].join(',')
					})
					.success(function(data) {
						$scope.tweets = data.tweets.statuses;
						console.log(data);
					})
					.error(function(data) {

					})
			});
	};


});