"use strict";

		/** Require Strategies */
var LocalStrategy = require("passport-local").Strategy,
		FacebookStrategy = require("passport-facebook").Strategy,
		TwitterStrategy = require("passport-twitter").Strategy,
		GoogleStrategy = require("passport-google").Strategy,

		/** Require User Model */
		User = require("../app/models/user"),

		/** Require Auth Tokens */
		Oauth = require("./oauth");

var createNewUser = function(config, user, done) {
	user = new User(config);
	user.save(function(err) {
			if (err) return done(err);
			return done(err, user);
	});
};

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
			clientID: Oauth.Facebook.appId,
			clientSecret: Oauth.Facebook.appSecret,
			callbackURL: Oauth.Facebook.callbackUrl
		},
		function(accessToken, refreshToken, profile, done) {
			User.find({ "facebook.id": profile.id }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					createNewUser({
						name: profile.displayName,
						email: profile.emails[0].value,
						username: profile.username,
						provider: "facebook",
						facebook: profile._json
					}, user, done);
				}
		});
	}),

	/** Twitter Strategy */
	twitterStrategy: new TwitterStrategy({
			consumerKey: Oauth.Twitter.consumerKey,
			consumerSecret: Oauth.Twitter.consumerSecret,
			callbackURL: Oauth.Twitter.callbackUrl
		},
		function(token, tokenSecret, profile, done) {
			User.find({ "twitter.id_str": profile.id }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					createNewUser({
						name: profile.displayName,
						username: profile.username,
						provider: "twitter",
						twitter: profile._json
					}, user, done);
				}
			});
		}
	),

	/** Google Strategy */
	googleStrategy: new GoogleStrategy({
			returnURL: Oauth.Google.returnURL,
			realm: Oauth.Google.realm
		},
		function(identifier, profile, done) {
			User.find({ "google.id": identifier }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
          createNewUser({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: "google",
              google: profile._json
					}, user, done);
				}
			});
		}
	),

};