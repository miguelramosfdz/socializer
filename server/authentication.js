exports = module.exports = (function() {
	'use strict';

	var LocalStrategy = require('passport-local').Strategy;
	var User = require('../app/models/User');

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
		}
	};

})();
