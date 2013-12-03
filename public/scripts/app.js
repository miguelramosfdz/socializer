var app = angular.module('Statly', ['ngRoute', 'ngResource', 'ngCookies']);

var socket = io.connect('http://localhost:3000');

socket.on('connected', function (data) {
  console.log(data);
});