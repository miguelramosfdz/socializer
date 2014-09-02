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
  app.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  /* Route for sign-up */
  app.get('/signup', Authenticate.isNotLoggedIn, UserController.getSignUp);
  app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  /* Route for log-out */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('home', { user: req.user });
  });

};
