/*jshint strict:false */

/**
 * Module dependencies.
 */
var path = require('path');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var engines = require('consolidate');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'jade');
app.engine('jade', engines.jade);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../build')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.setup(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
