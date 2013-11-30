app.service('UserService', [
	function () {
		var user = {
			isLoggedIn: false,
			username: ''
		}

		return user;
	}
]);