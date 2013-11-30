app.service('User', [
	function() {
		var user = {
			isLoggedIn: false,
			username: ''
		}

		return user;
	}
]);

app.service('Auth',
	function ($http) {
		return {
			user: {},

			signedin: function() {
				return $http.get('/signedin');
			},

			signin: function(params) {
				return $http.post('/signin', params);
			},

			signOut: function() {
				return $http.get('/signout');
			}
		}
});