exports = module.exports = (function() {
  'use strict';

  var LocalStrategy = require('passport-local').Strategy;
  var User = require('../app/models/User');
  var Mailer = require('./mailer');
  var UserEmails = require('../app/views/emails/user_emails');
  var Hedgehog = require('../.hedgehog');

  /**
   * Passport Strategies
   */
  
  var TwitterStrategy = require('passport-twitter').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  return {

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

    // route middleware to make sure a user is logged in
    isLoggedIn: function(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated()) return next();
      res.redirect('/login');
    },

    isNotLoggedIn: function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/');
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

      passport.use('local-signup', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
        },
        function(req, email, password, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (err)
              return done(err);

            if (user)
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

            if (req.body.password != req.body.password_confirmation)
              return done(null, false, req.flash('signupMessage', 'Password do not match.'));

            var newUser = new User();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.set('password', req.body.password);
            newUser.save(function(err) {
              if (err) throw err;
              var email = UserEmails.sign_up;
              Mailer.sendMail(newUser.email, email.subject, email.text, email.html);
              return done(null, newUser);
            });
          });
        })
      );

      passport.use('local-login', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
        },
        function(req, email, password, done) {
          User.findOne({ email:  email }, function(err, user) {
            if (err)
              return done(err);

            if (!user)
              return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
          });
        })
      );

      // Facebook
      passport.use(new FacebookStrategy({
          clientID: Hedgehog.oauth.Facebook.appId,
          clientSecret: Hedgehog.oauth.Facebook.appSecret,
          callbackURL: Hedgehog.oauth.Facebook.callbackURL,
          /**
           * Allows for passing in the req from our route, thus checking
           * if a user is logged in or not.
           */
          passReqToCallback: true 
        },
        // facebook will send back the token and profile
        function(req, token, refreshToken, profile, done) {
          // asynchronous
          process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    /**
                     * If there is an error, such as an issue with connecting
                     * to the database, return it.
                     */
                    if (err) return done(err);
                    /**
                     * If the user is found, then log them in
                     */
                    if (user) { 
                      /**
                       * User has been found so return that user.
                       */
                      return done(null, user); 
                    } else {
                        /**
                         * If there is no user found with that Facebook id, 
                         * create a new one.
                         * @type {User}
                         */
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            } else {
              /**
               * User already exists and is logged in, so we only have to link 
               * the accounts
               */
              var user = req.user; // pull the user out of the session

              /**
               * Add facebook credentials to user
               */
              user.facebook.id    = profile.id;
              user.facebook.token = token;
              user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = profile.emails[0].value;

              // save the user
              user.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, user);
              });
            }
          });
      }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
      consumerKey: Hedgehog.oauth.Twitter.consumerKey,
      consumerSecret: Hedgehog.oauth.Twitter.consumerSecret,
      callbackURL: Hedgehog.oauth.Twitter.callbackURL
    },
    function(req, token, tokenSecret, profile, done) {
      process.nextTick(function() {
        // check if the user is already logged in
        if (!req.user) {
          User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.twitter.token) {
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
              }

              return done(null, user); // user found, return that user
            } else {
              var newUser = new User();
              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.twitter.displayName = profile.displayName;

              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
            }
          });
        } else {
          console.log('meow');
          var user = req.user;
          user.twitter.id = profile.id;
          user.twitter.token = token;
          user.twitter.username = profile.username;
          user.twitter.displayName = profile.displayName;

          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        }
      });
    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
      clientID: Hedgehog.oauth.Google.clientId,
      clientSecret: Hedgehog.oauth.Google.clientSecret,
      callbackURL: Hedgehog.oauth.Google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ 'google.email': profile.email }, function(err, user) {
          if (err) return done(err);

          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.google.token) {
                user.google.token = accessToken;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
              }

              return done(null, user);
            } else {
              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = accessToken;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value; // pull the first email

              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
            }
          });
        });
      }));
		}
	};

})();
