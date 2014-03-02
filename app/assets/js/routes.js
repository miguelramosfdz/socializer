'use strict';

var partial = function(type, page) {
  return 'partials/'+type+'/'+page;
};

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/about', {
        templateUrl: partial('static', 'about')
      }).
      otherwise({
        redirectTo: '/'
      })
  }]);