app.controller('HeaderCtrl', [ '$scope', 'UserService',
	function ($scope, User) {

		$scope.user = User.username;

	}
]);