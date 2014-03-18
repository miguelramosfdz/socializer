/*jshint strict:false */

// NPM module dependencies
var path = require('path');
var http = require('http');
var express = require('express');
var expressJwt = require('express-jwt');
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
		.use('/api', expressJwt({ secret: "ilikebigbuttsandicannotlie" }))
		.use(express.urlencoded())
		.use(express.json())
		.set('jsonp callback', true)
		.use(express.methodOverride())
		.use(express.cookieParser())

		// Define session store
		.use(express.session({
			store: new redisStore({ client: redisClient }),
			secret: "ilikebigbuttsandicannotlie"
		}))

		// Use passport session
		.use(passport.initialize())
		.use(passport.session())
		// .use(passport.authenticate())

		// Define CSRF Protection
		.use(express.csrf({ value: authentication.csrf }) )
		.use(authentication.csrfCookieToken)
		.use(authentication.csrfFormToken)
		.use(authentication.cors)

		.use(flash())
		.use(express.static(path.join(__dirname, '../build')))

		// Utilize compress method for specified file types
		.use(express.compress({
			filter: function(req, res) {
				return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
			},
			level: 9
		}));
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
