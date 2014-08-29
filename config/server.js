(function() {
  "use strict";

  // Module dependencies
  var http = require("http");
  var morgan  = require('morgan');
  var express = require("express");
  var bodyParser = require("body-parser");
  var methodOverride = require('method-override');

  // Application dependencies
  var routes = require("./routes");
  
  /** Declare app */
  var app = express();

  /** Declare port for app */
  app.set("port", 3000);

  /** Declare views engine & folder */
  app.set("view engine", "jade");
  app.set("views", __dirname + "/../app/views");

  /** Logging */
  app.use(morgan('combined'));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

  app.set("showStackError", true);

  /** Declare public folder */
  app.use(express.static(__dirname + "/../public"));
  
  /** Enable JSONP */
  app.set("jsonp callback", true);

  app.use(express.Router());

  /** Setup routes */
  routes.setup(app);

  /** Declare server */
  var server = http.createServer(app);

  /** Start app */
  server.listen(app.get("port"), function() {
    console.log("Express app listening on port " + app.get("port"));
  });

  module.exports = app;

})();