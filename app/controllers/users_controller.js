"use strict";

var User = require("../models/user"),
		passport = require("passport");

module.exports = {

	authCallback: function(req, res, next) {
		res.redirect('/');
	},

	signup: function(req,res,next) {
		var new_user = req.body.user;
		if ( new_user.password === new_user.passwordConfirmation ) {
			User.create({
				username: new_user.username,
				email: new_user.email,
				password: new_user.password
			}, function ( err, user ) {
				if (err) {
					return res.json(400, { message: "User could not be signed up:"+err });
				}
				req.logIn(user, function(err) {
					if (err) { return res.json(500, { message: err }); }
					return res.json(200, { user: user });
				});
			});
		} else {
			return res.json(403, { message: 'Passwords do not match' });
		}
	},

	signin: function (req, res, next) {
		passport.authenticate("local", function(err, user, info) {
			var user = user;
			if (err) { return res.json(500, { message: err }); }
			if (!user) { return res.json(403, { message: "Unknown user: "+user}); }
			req.logIn(user, function(err) {
				if (err) { return res.json(500, { message: err }); }
				return res.json(200, { user: user });
			});
		})(req, res, next);
	},

	is_signed_in: function ( req, res, next ) {
		if (req.isAuthenticated()) {
			return res.send(req.user);
		} else {
			return res.json(403, { message: 'No user signed in' });
		}
	},

	signout: function ( req, res, next ) {
		req.logOut();
		return res.json({ message: "You've been logged out." });
	}

};