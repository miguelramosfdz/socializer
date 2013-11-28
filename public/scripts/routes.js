app.config([ '$routeProvider', '$locationProvider',

  function ( $routeProvider, $locationProvider) {

    var show = function (view) {
      return '/templates/' + view;
    }

    $routeProvider.
      when('/', {
        templateUrl: show('static/home')
      }).
      when('/signup', {
        templateUrl: show('users/sign_up')
      }).
      when('/signin', {
        templateUrl: show('users/sign_in')
      }).
      otherwise({
        redirectTo: '/'
      })

    // $locationProvider.html5Mode(true);
  }
]);
