'use strict';

// NPM module dependencies
var path = require('path');
var http = require('http');
var express = require('express');
var engines = require('consolidate');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');

// App module dependencies
var db = require('./db');
var routes = require('./routes');
var authentication = require('./authentication');

// Declare server
var server = express();

// Configure server for all environments
server.configure(function() {
	server.set('port', process.env.PORT || 3000);
	server.set('views', path.join(__dirname, '../app/views'));
	server.set('view engine', 'jade');
	server.engine('jade', engines.jade);
	server.use(express.favicon());
	server.use(express.logger('dev'));
	server.use(express.json());
	server.use(express.urlencoded());
	server.use(express.methodOverride());
	server.use(express.cookieParser());
	server.use(express.session({ secret: 'ilikebigbuttsandicannotlie' }));
	server.use(passport.initialize());
	server.use(passport.session());
	server.use(flash());
	server.use(express.static(path.join(__dirname, '../build')));
});

// Development enviroment configuration
if ('development' == server.get('env')) {
  server.use(express.errorHandler());
}

// Setup database
db.setup(mongoose);

// Setup routes
routes.setup(server, passport);

// Set up authentication
authentication.setup(passport);

// Start server
server.listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});
