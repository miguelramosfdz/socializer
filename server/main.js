/**
 * Module dependencies.
 */
var _ = require('lodash');
var path = require('path');
var lusca = require('lusca');
var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');
var compress = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var MongoStore = require('connect-mongo')({ session: session });

/**
 * Set Hedgehog as global variable
 * @type {Object}
 */
GLOBAL.Hedgehog = require('../.hedgehog.js');

/**
 * Application dependencies
 */
var db = require('./db');
var routes = require('./routes');
var auth = require('./authentication');

/**
 * Create Express server.
 */
var app = express();

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Set up authentication
 */
auth.setup(passport);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || Hedgehog.port || 3000);
app.use(express.static(path.join(__dirname, '../public'), { maxAge: week }));
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
  secret: Hedgehog.sessionSecret,
  store: new MongoStore({
    url: Hedgehog.db.sessionStore,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Enable Lusca security
 */
app.use(lusca({
    csrf: true,
    csp: { /* ... */},
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true},
    xssProtection: true
}));

app.use(lusca.csrf());
app.use(lusca.csp({ /* ... */}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.p3p('ABCDEF'));
app.use(lusca.hsts({ maxAge: 31536000 }));
app.use(lusca.xssProtection(true));

/**
 * Enable flash messages
 */
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_message = {};
    res.locals.error_message = {};
    next();
});

/**
 * Add current_user(req.user) to response locals
 */
app.use(function(req, res, next) {
  res.locals.app_name = Hedgehog.appName;
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
 * Setup database
 */
db.setup();

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;