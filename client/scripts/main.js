(function() {
    'use strict';
    
    angular.module('Boiler', [ 'ngRoute' ])
        .config(function($routeProvider, $locationProvider) {

                var partial = function(type, page) {
                    return 'partials/'+type+'/'+page;
                };

                $routeProvider.
                    when('/signup', {
                        templateUrl: partial('users', 'signup'),
                        controller: 'SignUpCtrl'
                    }).
                    when('/about', {
                        templateUrl: partial('static', 'about')
                    }).
                    when('/profile', {
                        templateUrl: partial('users', 'profile'),
                        controller: 'ProfileCtrl'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });

                $locationProvider.html5Mode(true);
        });

    // Redirect to rid url of '#_=_' added by Facebook auth redirect
    if (window.location.hash && window.location.hash == '#_=_') {
        window.location.hash = '';
    }

})();