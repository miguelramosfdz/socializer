/**
 * Module dependencies.
 */
var _ = require('lodash');
var path = require('path');
var lusca = require('lusca');
var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var flash = require('express-flash');
var compress = require('compression');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var express_session = require('express-session');
var express_validator = require('express-validator');
var MongoStore = require('connect-mongo')(express_session);

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Set Hedgehog as global variable
 * @type {Object}
 */
GLOBAL.Hedgehog = require('../.hedgehog.js');

/**
 * Set Sentinal as global variable
 * @type {Object}
 */
GLOBAL.Sentinal = require('./sentinal/sentinal');

/**
 * Set App as global variable
 * @type {Object}
 */
GLOBAL.App = {};

/**
 * Set up  global user model
 * @type {User}
 */
GLOBAL.App.User = require('../app/models/User');


/**
 * Set up global mailer
 * @type {Mailer}
 */
GLOBAL.App.Mailer = require('./mailer');

/**
 * Application dependencies
 */
var db = require('./db');
var routes = require('./routes');

/**
 * Create Express server.
 */
var app = express();

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
app.use(express_validator());
app.use(methodOverride());
app.use(cookieParser());

app.use(express_session({
  resave: true,
  saveUninitialized: true,
  secret: Hedgehog.sessionSecret,
  store: new MongoStore({
    db: Hedgehog.db.session_store,
  })
}));

/**
 * Set up Sentinal
 */
app.use(Sentinal.initialize());

app.use(Sentinal.logger.deserialize_user(function(id, done) {
  App.User.findOne({ _id: id }).exec(function(err, user) {
    if (err) 
      return done(new Error("Error connecting to database"));

    if (!user)
      return done(new Error("Invalid id."));

    return done(null, user);
  });
}));

// TODO Pull out and place into Sentinal
app.use(function(req, res, next) {
  console.log("Time: " + Date.now());

  var getObjLength = function(obj) {
    return Object.keys(obj).length;
  };

  var logObj = function(name, obj) {
    console.log(name+": " + JSON.stringify(obj));
  };

  if (getObjLength(req.params)) {
    logObj("Params", req.params);
  }

  if (getObjLength(req.body)) {
    logObj("Body", req.body);
  }

  if (getObjLength(req.query)) {
    logObj("Query", req.query);
  }

  for (var i = 0; i < 2; i++) {
    console.log("");
  }

  next();
});

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
routes.setup(app);

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