var app = angular.module('Boiler', ['ngRoute', 'ngResource', 'ngCookies']);


// angular.element(document).ready(function() {
//     //Fixing facebook bug with redirect
//     if (window.location.hash == "#_=_") window.location.hash = "";

//     //Then init the app
//     angular.bootstrap(document, ['mean']);
// });

var socket = io.connect('http://localhost:3000');

socket.on('connected', function (data) {
  console.log(data);
});