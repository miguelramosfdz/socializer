angular.module('hogar').controller('NavCtrl', function($scope, $http) {

  $scope.logOut = function() {
    $http({ method: 'POST', url: '/logout' });
  };

});
