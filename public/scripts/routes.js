app.config([ '$routeProvider', '$locationProvider',

  function ( $routeProvider, $locationProvider) {

    var show = function (view) {
      return '/templates/' + view;
    }

    $routeProvider.
      when('/', {
        templateUrl: show('static/home')
      }).
      when('/sign_up', {
        templateUrl: show('users/sign_up')
      }).
      otherwise({
        redirectTo: '/'
      })

    // $locationProvider.html5Mode(true);
  }
]);
