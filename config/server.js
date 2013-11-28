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

/** Declare app */
var app = express();

/*
 * Declare views engine & folder
 */
app.set('view engine', 'jade');
app.set('views', __dirname + '/../app/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.set('showStackError', true);

/*
 * Add CSRF support
 */
app.use( express.cookieParser( 'glowmachine' ) );
app.use( express.cookieSession() );
app.use( express.csrf({ value: Authentication.csrf }) );
app.use(function ( req, res, next ) {
   res.cookie( 'XSRF-TOKEN', req.csrfToken() );
   next();
});

/*
 * Setup Passport authentication
 */
app.use( passport.initialize() );
app.use( passport.session() );
passport.use(Authentication.localStrategy);
passport.serializeUser(Authentication.serializeUser);
passport.deserializeUser(Authentication.deserializeUser);

/**
 * Declare public folder
 */
app.use(express.static(__dirname + '/../public'));

development.setup(app, express);
db.setup(mongoose);
routes.setup(app, passport, express);

app.listen(5000);

module.exports = app;