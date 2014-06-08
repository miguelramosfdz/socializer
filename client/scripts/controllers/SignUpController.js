angular.module('hogar').controller('SignUpCtrl', function($scope, UserFactory) {

  $scope.user = {
    username: null,
    email: null,
    password: null,
    passwordConfirmation: null
  };

  $scope.signUp = function() {
    UserFactory.signUp($scope.user);
  };

});
