/**
 * Module dependencies.
 */
var _ = require('lodash');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var MongoStore = require('connect-mongo')({ session: session });

/**
 * Application dependencies
 */
var routes = require('./routes');

/**
 * API keys and Passport configuration.
 */
var config = require('./config');
var passportConf = require('passport');

/**
 * Create Express server.
 */
var app = express();

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * CSRF whitelist.
 */

var csrfExclude = ['/url1', '/url2'];

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../build'), { maxAge: week }));
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret,
  store: new MongoStore({
    url: config.db.sessionStore,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Enable CSRF protection
 */
app.use(function(req, res, next) {
  if (_.contains(csrfExclude, req.path)) return next();
  csrf(req, res, next);
});

/**
 * Add current_user(req.user) to response locals
 */
app.use(function(req, res, next) {
  res.locals.current_user = req.user;
  next();
});

/**
 * Remember original destination before login.
 */
app.use(function(req, res, next) {
  var path = req.path.split('/')[1];

  if (/auth|login|logout|signup|fonts|favicon/i.test(path)) {
    return next();
  }

  req.session.returnTo = req.path;
  next();
});

/**
 * Setup routes
 */
routes.setup(app, passport);

/**
 * 500 Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;