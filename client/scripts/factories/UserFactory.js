angular.module('hogar').factory('UserFactory', function($http, $route) {

  var _this = this;

  this.user = null;

  return {

    user: _this.user,

    authenticate: function() {
      $http({ method: 'GET', url: '/api/user' })
        .success(function(data,status, headers, config) {
          _this.user = result;
        })
    },

    logIn: function(user) {
      $http({ method: 'POST', url:'/login', data: user })
    },

    signUp: function(user) {
      $http({ method: 'POST', url:'/signup', data: user })
    }

  };

});