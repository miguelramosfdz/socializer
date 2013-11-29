"use strict";

var User = require("../models/user"),
		passport = require("passport");

module.exports = {

	signup: function ( req, res, next ) {
		var new_user = req.body.user;
		if ( new_user.password === new_user.password_confirmation ) {
			User.create({
				username: new_user.username,
				email: new_user.email,
				password: new_user.password
			}, function ( err, user ) {
				if (err) return res.json(400, { message: "User could not be signed up:"+err });
				return res.json({
					message: "User Signed Up.",
					user: {
						username: user.username,
						accessToken: user.accessToken
					}
				});
			});
		}
	},

	signin: function (req, res, next) {
		passport.authenticate("local", function(err, user, info) {
			var user = user;
			if (err) { return next(err); }
			if (!user) { return res.json(403, { message: "Unknown user: "+user}); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.json(200, { message: 'User signed in.', user: user });
			});
		})(req, res, next);
	},

	is_signed_in: function ( req, res, next ) {
		return res.send( req.isAuthenticated() ? req.user : "0" );
	},

	signout: function ( req, res, next ) {
		req.logOut();
		return res.json({ message: "You've been logged out." });
	}

};