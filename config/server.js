// Module dependencies
var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    passport = require('passport'),
    db = require('./db'),
    mongoose = require('mongoose'),
    Authentication = require('./authentication'),
    development = require('./envs/dev');

/** Declare server */
var server = express();

/**
 * Declare port for server
 */
server.set('port', 5000);

/*
 * Declare views engine & folder
 */
server.set('view engine', 'jade');
server.set('views', __dirname + '/../server/views');

server.use(express.favicon());
server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
server.set('showStackError', true);

/*
 * Add CSRF support
 */
server.use( express.cookieParser( 'glowmachine' ) );
server.use( express.cookieSession() );
server.use( express.csrf({ value: Authentication.csrf }) );
server.use(function ( req, res, next ) {
   res.cookie( 'XSRF-TOKEN', req.csrfToken() );
   next();
});

/*
 * Setup Passport authentication
 */
server.use( passport.initialize() );
server.use( passport.session() );
passport.use(Authentication.localStrategy);
passport.serializeUser(Authentication.serializeUser);
passport.deserializeUser(Authentication.deserializeUser);

/**
 * Declare public folder
 */
server.use(express.static(__dirname + '/../public'));

development.setup(server, express);
db.setup(mongoose);
routes.setup(server, passport, express);

server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});

module.exports = server;