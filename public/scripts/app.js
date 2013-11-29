var app = angular.module('Boiler', ['ngRoute', 'ngResource']);

var socket = io.connect('http://localhost:5000');

socket.on('connected', function (data) {
  console.log(data);
});