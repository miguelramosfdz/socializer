/*jshint strict:false */

// NPM module dependencies
var path = require('path');
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var engines = require('consolidate');
var flash = require('connect-flash');
var liveReload = require('connect-livereload');

// App module dependencies
var db = require('./db');
var routes = require('./routes');
var authentication = require('./authentication');

// Require Redis & declare store and client
var redis = require('redis');
var redisStore = require('connect-redis')(express);
var redisClient = redis.createClient();

// Declare server
var server = express();

// Configure server for all environments
server.configure(function() {
	server.set('port', process.env.PORT || 3000)
		.set('views', path.join(__dirname, '../app/views'))
		.set('view engine', 'jade')
		.engine('jade', engines.jade)
		.use(express.favicon())
		.use(express.logger('dev'))
		.use(express.query())
		.use(express.json())
		.set('jsonp callback', true)
		.use(express.urlencoded())
		.use(express.methodOverride())
		.use(express.cookieParser())
		.use(express.session({
			store: new redisStore({ client: redisClient }),
			secret: "ilikebigbuttsandicannotlie"
		}))
		// Cross-Site Request Forgery
		.use(express.csrf({ value: authentication.csrf }) )
		.use(function ( req, res, next ) {
			res.cookie( "XSRF-TOKEN", req.csrfToken() );
			next();
		})
		.use(passport.initialize())
		.use(passport.session())
		.use(flash())
		.use(express.static(path.join(__dirname, '../build')))
		// Access Control Setup
		.use(function(req, res, next) {
			// res.header('Access-Control-Allow-Origin', '*');
			// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		    if ('OPTIONS' == req.method) {
		        res.send(200);
		    } else {
		        next();
		    }
		})
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
