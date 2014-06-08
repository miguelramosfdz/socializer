angular.module('hogar').factory('UserFactory', function($http) {

  var _this = this;

  this.user = null;

  return {

    user: _this.user,

    authenticate: function() {
      var result;

      $http({ method: 'GET', url: '/api/user' })
        .success(function(data,status, headers, config) {
          _this.user = result;
        })
        .error(function(data,status, headers, config) {
          debugger;
        });

      return result;
    },

    signUp: function(user) {
      var result;

      $http({ method: 'POST', url:'/signup', data: user })
        .success(function(data, status, headers, config) {
          debugger;
        })
        .error(function(data, status, headers, config) {
          debugger;
        });

      return result;
    }
  };

});