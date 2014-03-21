app.factory('UserFactory', function($http, $rootScope) {

	var _this = this;

	this.user = null;

	return {
		user: null,

		authenticate: function() {
			var result;

			$http({ method: 'GET', url: '/api/user' })
				.success(function(data,status, headers, config) {
					result = data.user;
					_this.user = result;
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