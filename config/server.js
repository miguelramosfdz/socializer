"use strict";

// Module dependencies
var express = require("express"),
		routes = require("./routes"),
		http = require("http"),
		redisStore = require("connect-redis")(express),
		db = require("./db"),
		mongoose = require("mongoose"),
		development = require("./envs/dev");

/** Declare app */
var app = express();

/** Declare port for app */
app.set("port", 3000);

/** Declare views engine & folder */
app.set("view engine", "jade");
app.set("views", __dirname + "/../app/views");

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.set("showStackError", true);

/** Add CSRF support */
app.use(express.cookieParser());
app.use(express.session({ secret: 'boiler' }));

/** Cross-Site Request Forgery */
// app.use( express.csrf() );
// app.use(function ( req, res, next ) {
// 	 res.cookie( "XSRF-TOKEN", req.csrfToken() );
// 	 next();
// });

/** Declare public folder */
app.use(express.static(__dirname + "/../public"));

/** CORS */
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, Cookie");
	next();
});

app.options("*", function (req, res) {
	res.send("");
});

/** Enable JSONP */
app.set("jsonp callback", true);


/**
 *	Enable HTML5 mode for Angular routes to work without needing #
 */
// app.use(function(req, res) {
//   return res.redirect(req.protocol + "://" + req.get("Host") + "/#" + req.url)
// });

app.use(app.router);

/** Setup development environment */
development.setup(app, express);

/** Setup database */
db.setup(mongoose);

/** Setup routes */
routes.setup(app);

/** Declare server */
var server = http.createServer(app);

/** Start app */
server.listen(app.get("port"), function() {
	console.log("Express app listening on port " + app.get("port"));
});

/** Declare socket */
var io = require("socket.io").listen(server);

/** Emit message to ensure connection */
io.on("connection", function (socket) {
	socket.emit("connected", { message: "Communicating live from the boiler..."});
})

module.exports = app;