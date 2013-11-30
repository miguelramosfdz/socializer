app
  .controller('SignUpCtrl', ['$scope', '$http', '$rootScope', '$location', 'UserService',
  	function ($scope, $http, $rootScope, $location, User) {

    	$scope.user = {};

    	$scope.signUp = function () {
    		$http
    			.post('/signup', { user: $scope.user })
    			.success(function ( data, status, headers, config ) {
            User.isLoggedIn = true;
            User.username = data.user.username;
    			})
    			.error(function ( data, status, headers, config ) {
    				debugger;
    			})
    	}

  	}
  ])

app
  .controller('SignInCtrl', ['$scope', '$http', '$rootScope', '$location', 'UserService',
  function ($scope, $http, $location, $rootScope, User) {

    $scope.signedIn = User.username;

    $scope.user = {
      username: '',
      password: ''
    };

    $scope.signIn = function () {
      $http
        .post('/signin', {
          username: $scope.user.username,
          password: $scope.user.password
        })
        .success(function ( data, status, headers, config ) {
          User.isLoggedIn = true;
          User.username = data.user.username;
        })
        .error(function ( data, status, headers, config ) {
          $('.error').fadeIn(500).fadeOut(500);
          $scope.message = data.message;
        })
    }

  }
]);