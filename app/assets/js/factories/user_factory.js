app.factory('UserFactory', function($http) {
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
		},
		signUp: function(user) {
			var result;

			$http({ method: 'POST', url:'/api/user', data: user })
				.success(function(data, status, headers, config) {
					result = data;
				})
				.error(function(data, status, headers, config) {
					results = data;
				});

			return result;
		}
	};
});