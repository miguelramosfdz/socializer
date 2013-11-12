app.controller('SignUpCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.user = {};

  $scope.signUp = function () {
    $http
      .post('/sign_up', { user: $scope.user })
      .success(function ( data, status, headers, config ) {
        console.log(data);
      })
      .error(function ( data, status, headers, config ) {
        console.log(data);
      })
  }

}]);