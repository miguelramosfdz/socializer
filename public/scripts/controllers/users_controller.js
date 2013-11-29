app
  .controller('SignUpCtrl', ['$scope', '$http', '$rootScope', '$location',
  	function ($scope, $http, $rootScope, $location) {

    	$scope.user = {};

    	$scope.signUp = function () {
    		$http
    			.post('/signup', { user: $scope.user })
    			.success(function ( data, status, headers, config ) {
            $rootScope.user = data.user;
    				// $location.path( "#/" );
    			})
    			.error(function ( data, status, headers, config ) {
    				debugger;
    			})
    	}

  	}
  ])

app
  .controller('SignInCtrl', ['$scope', '$http', '$rootScope', '$location',
  function ($scope, $http, $location, $rootScope) {

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
          $rootScope.user = data.user;
          // $location.path( "/main" );
        })
        .error(function ( data, status, headers, config ) {
          $('.error').fadeIn(500).fadeOut(500);
          $scope.message = data.message;
        })
    }

  }
]);