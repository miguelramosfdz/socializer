angular.module('hogar').controller('SignUpCtrl', function($scope, UserFactory) {

  $scope.user = {
    email: null,
    password: null,
    passwordConfirmation: null
  };

  $scope.signUp = function() {
    debugger;
    UserFactory.signUp($scope.user);
  };

});
