'use strict';

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../app/model/User');
var OAuth = require('./oauth');

exports.csrf = function(req) {
	return (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers["x-csrf-token"]) || (req.headers["x-xsrf-token"]);
};

exports.setup = function(passport) {

	// used to serialize user
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne({ email: email }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}));

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
					new User({
							facebook: {
								// Save user's Facebook id
								id: profile.id,
								// Set all of the facebook information in our user model							
								profile: profile,
								// Save user's Facebook token
								token: token
							}
						})
						.save(function(err) {
							if (err)
								throw err;

							// if successful, return the new user
							return done(null, newUser);
						});					
					// newUser.facebook.id = profile.id;
					// newUser.facebook.profile = profile;
					// newUser.facebook.token = token;
				}
			});
		});

	}));
	
	passport.use(new TwitterStrategy({
		consumerKey: OAuth.Twitter.consumerKey,
		consumerSecret: OAuth.Twitter.consumerSecret,
		callbackURL: OAuth.Twitter.callbackURL
	},
	function(token, tokenSecret, profile, done) {
		User.findOne({ 'twitter.id_str': profile.id}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, user);
			} else {
				new User({
						name: profile.displayName,
						username: profile.username,
						provider: 'twitter',
						twitter: profile._json
					})
					.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
			}
		});
	}));


};