app.factory('UserFactory', function() {
	return {
		authenticate: function() {
			var result;

			$http({ method: 'GET', url: '/api/user' })
				.success(function(data,status, headers, config) {
					result = data.user; 
				})
				.error(function(data,status, headers, config) {
					result = data.message;
				});

			return result;
		}
	};
});