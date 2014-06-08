/*jshint strict:false */
(function() {
  "use strict";

  // NPM module dependencies
  var path = require('path');
  var http = require('http');
  var express = require('express');
  var mongoose = require('mongoose');
  var passport = require('passport');
  var engines = require('consolidate');
  var flash = require('connect-flash');
  var config = require('./config');
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
      .use(express.urlencoded())
      .use(express.json())
      .set('jsonp callback', true)
      .use(express.methodOverride())
      .use(express.cookieParser())

      // Define session store
      .use(express.session({
        store: new redisStore({ client: redisClient }),
        secret: process.env.BOILER_SECRET
      }))

      // Use passport session
      .use(passport.initialize())
      .use(passport.session())

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
  require('./db').setup(mongoose);

  // Setup routes
  require('./routes').setup(server, passport);

  // Set up authentication
  require('./authentication').setup(passport);

  // Start server
  server.listen(server.get('port'), function(){
    console.log('Express server listening on port ' + server.get('port'));
  });

})();