exports = module.exports = (function() {
	'use strict';

	var LocalStrategy = require('passport-local').Strategy;
	var FacebookStrategy = require('passport-facebook').Strategy;
	var TwitterStrategy = require('passport-twitter').Strategy;
	var User = require('../app/model/User');
	var Config = require('./config');

	return {
		csrf:  function(req) {
			return (req.body && req.body._csrf) || (req.query && req.query._csrf) || 
				(req.headers['x-csrf-token']) || (req.headers['x-xsrf-token']);
		},

		csrfFormToken: function(req, res, next) {
			res.locals.csrfFormToken = req.csrfToken();
			next();
		},

		csrfCookieToken: function ( req, res, next ) {
			res.cookie( "XSRF-TOKEN", req.csrfToken() );
			next();
		},

		cors: function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			if ('OPTIONS' == req.method) {
				res.send(200);
			} else {
				next();
			}
		},

		setup: function(passport) {
			// used to serialize user
			passport.serializeUser(function(user, done) {
				done(null, user.id);
			});

			// used to deserialize user
			passport.deserializeUser(function(id, done) {
				User.findOne({ _id: id }, function(err, user) {
					done(err, user);
				});
			});

			// For non-OAuth users
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

			// For 'Sign up with Facebook'
			passport.use(new FacebookStrategy({
				clientID: Config.oauth.Facebook.appId,
				clientSecret: Config.oauth.Facebook.appSecret,
				callbackURL: Config.oauth.Facebook.callbackURL
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
									name: profile.displayName,
									email: profile.emails[0].value,
									username: profile.username,
									provider: 'facebook',
									facebook: profile._json
								})
								.save(function(err, newUser) {
									if (err) {
										throw err;
									}
									// if successful, return the new user
									return done(null, newUser);
								});
						}
					});
				});

			}));

			// For 'Sign up with Twitter'
			passport.use(new TwitterStrategy({
				consumerKey: Config.oauth.Twitter.consumerKey,
				consumerSecret: Config.oauth.Twitter.consumerSecret,
				callbackURL: Config.oauth.Twitter.callbackURL
			},
			function(token, tokenSecret, profile, done) {
				User.findOne({ 'twitter.id_str': profile.id }, function(err, user) {
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
		}
	};

})();
