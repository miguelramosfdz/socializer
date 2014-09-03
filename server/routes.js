/* jshint strict:false */

exports.setup = function(app, passport) {
  "use strict";

  var Authenticate = require('./authentication');
  var UserController = require('../app/controllers/user_controller');

  // Route for serving templates
  app.get('/partials/:type/:file', function(req, res) {
    res.render('partials/'+req.params.type+'/'+req.params.file);
  });

  /* Route for getting current user */
  app.get('/api/user', function(req, res) {
    res.send(req.isAuthenticated() ? { user: req.user } : { message: 'No user signed in' });
  });

  app.get('/account', Authenticate.isLoggedIn, UserController.getAccount);

  app.post('/reset-password', Authenticate.isLoggedIn, UserController.resetPassword);

  /* Route for log-in */
  app.get('/login', Authenticate.isNotLoggedIn, UserController.getLogIn);
  app.post('/login', passport.authenticate('local-login', { 
    successRedirect: '/account',
    failureRedirect: '/' 
  }));

  /* Route for sign-up */
  app.get('/signup', Authenticate.isNotLoggedIn, UserController.getSignUp);
  app.post('/signup', passport.authenticate('local-signup', { 
    successRedirect: '/account',
    failureRedirect: '/' 
  }));

  /* Route for log-out */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // facebook -------------------------------
  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope: 'email' 
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/account',
    failureRedirect : '/'
  }));

  // Twitter --------------------------------

  // send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { 
    scope: 'email' 
  }));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback', passport.authorize('twitter', {
    successRedirect : '/account',
    failureRedirect : '/'
  }));


  // Google ---------------------------------
  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { 
    scope: ['profile', 'email'] 
  }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback', passport.authorize('google', {
    successRedirect : '/account',
    failureRedirect : '/'
  }));

  // Unlink accounts
  app.get('/unlink/local', Authenticate.isLoggedIn, function(req, res) {
      var user = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // Facebook -------------------------------
  app.get('/unlink/facebook', Authenticate.isLoggedIn, function(req, res) {
      var user = req.user;
      user.facebook.token = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // Twitter --------------------------------
  app.get('/unlink/twitter', Authenticate.isLoggedIn, function(req, res) {
      var user = req.user;
      user.twitter.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
  });

  // Google ---------------------------------
  app.get('/unlink/google', Authenticate.isLoggedIn, function(req, res) {
      var user = req.user;
      user.google.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('home', { user: req.user });
  });
  
};
