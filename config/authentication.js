'use strict';

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/model/User');
var OAuth = require('./oauth');

exports.csrf = function(req) {
	return (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers["x-csrf-token"]) || (req.headers["x-xsrf-token"]);
};

exports.setup = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		clientID        : OAuth.Facebook.appId,
		clientSecret    : OAuth.Facebook.appSecret,
		callbackURL     : OAuth.Facebook.callbackURL
	},
	function(token, refreshToken, profile, done) {

		process.nextTick(function() {
			// Find a user in the database based on their facebook id
			User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
				// Return error if one occurs
				if (err)
					return done(err);
				// if the user is found, then log them in
				if (user) {
					// Return user if user is found
					return done(null, user);
				} else {
					// Create new user if no user exists
					var newUser = new User();

					// Save user's Facebook id
					newUser.facebook.id = profile.id;

					// Set all of the facebook information in our user model
					newUser.facebook.profile = profile;

					 // Save user's Facebook token
					newUser.facebook.token = token;

					 // Save user
					newUser.save(function(err) {
						if (err)
							throw err;

						/* if successful, return the new user */
						return done(null, newUser);
					});
				}

			});
		});

	}));



};