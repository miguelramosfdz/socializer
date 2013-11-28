app
  .controller('SignUpCtrl', ['$scope', '$http', '$rootScope',
  	function ($scope, $http) {

    	$scope.user = {};

    	$scope.signUp = function () {
    		$http
    			.post('/signup', { user: $scope.user })
    			.success(function ( data, status, headers, config ) {
            debugger;
    				// $location.path( "/main" );
    			})
    			.error(function ( data, status, headers, config ) {
    				console.log(data);
    			})
    	}

  	}
  ])

app
  .controller('SignInCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http) {

    $scope.user = {};

    $scope.signIn = function () {
      $http
        .post('/signin', { user: $scope.user })
        .success(function ( data, status, headers, config ) {
          $location.path( "/main" );
        })
        .error(function ( data, status, headers, config ) {
          $('.error').fadeIn(500);
          $scope.message = data.message;
        })
    }

  }
]);