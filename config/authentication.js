"use strict";

		/** Require Strategies */
var LocalStrategy = require("passport-local").Strategy,
		FacebookStrategy = require("passport-facebook").Strategy,
		TwitterStrategy = require("passport-twitter").Strategy,
		GoogleStrategy = require("passport-google").Strategy,

		/** Require User Model */
		User = require("../app/models/user"),

		/** Require Auth Tokens */
		Token = require("./tokens");

module.exports = {

	/** Serialize sessions */
	serializeUser: function(user, done) {
		var createAccessToken = function () {
			var token = user.generateRandomToken();
			User.findOne( { accessToken: token }, function (err, existingUser) {
				if (err) { return done( err ); }
				/**
				 * If there is a user with access token,
				 * generate new one for user.
				 */
				if (existingUser) {
					createAccessToken();
				} else {
					user.set("accessToken", token);
					user.save( function (err) {
						if (err) return done(err);
						return done(null, user.get("accessToken"));
					});
				}
			});
		};

		if ( user._id ) {
			createAccessToken();
		}
	},

	// Deserialize sessions
	deserializeUser: function(token, done) {
		User.findOne({ accessToken: token } , function (err, user) {
			done(err, user);
		});
	},

	// Create CSRF token
	csrf: function(req) {
		var token = (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers["x-csrf-token"]) || (req.headers["x-xsrf-token"]);
		return token;
	},

	/** Local Strategy */
	localStrategy: new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: "Unknown user " + username }); }
			user.isValidPassword(password, function (err, isMatch) {
				if (err) return done(err);
				if(isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Invalid password" });
				}
			});
		});
	}),

	/** Facebook Strategy */
	facebookStrategy: new FacebookStrategy({
			clientID: Token.Facebook.appId,
			clientSecret: Token.Facebook.appSecret,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			User.find({ facebookId: profile.id }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					user = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						username: profile.username,
						provider: "facebook",
						facebook: profile._json
					});
					user.save(function(err) {
							if (err) return done(err);
							return done(err, user);
					});
				}
			});
		}
	),

	/** Twitter Strategy */
	twitterStrategy: new TwitterStrategy({
			consumerKey: Token.Twitter.consumerKey,
			consumerSecret: Token.Twitter.consumerSecret,
			callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
		},
		function(token, tokenSecret, profile, done) {
			User.find({ twitterId: profile.id }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					user = new User({
						name: profile.displayName,
						username: profile.username,
						provider: 'twitter',
						twitter: profile._json
					});
					user.save(function(err) {
							if (err) return done(err);
							return done(err, user);
					});
				}
			});
		}
	),

	/** Google Strategy */
	googleStrategy: new GoogleStrategy({
			returnURL: "http://localhost:3000/auth/google/return",
			realm: "http://localhost:3000"
		},
		function(identifier, profile, done) {
			User.find({ openId: identifier }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					user = new User({
						name: profile.displayName,
						username: profile.username,
						provider: 'twitter',
						twitter: profile._json
					});
					user.save(function(err) {
							if (err) return done(err);
							return done(err, user);
					});
				}
			});
		}
	),

};