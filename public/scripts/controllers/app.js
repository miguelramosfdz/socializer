app.controller('csrfCtrl',
  function($scope, $http) {

    $scope.submit = function() {
      $http
        .post('/', { value: $scope.value })
        .success(function(data) {
          $scope.answer = data
        })
        .error(function() {
          console.log('error')
        })
    }

  }
);