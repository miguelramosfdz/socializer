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

/** Declare public folder */
app.use(express.static(__dirname + "/../public"));

// Show error stack
app.use(express.errorHandler({showStack: true}));

app.options("*", function (req, res) {
	res.send("");
});

/** Enable JSONP */
app.set("jsonp callback", true);

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