/* jshint strict:false */

exports.setup = function(app, passport) {
  "use strict";

  var UserController = require('../app/controllers/user_controller');

  // Route for serving templates
  app.get('/partials/:type/:file', function(req, res) {
    res.render('partials/'+req.params.type+'/'+req.params.file);
  });

  // route middleware to make sure a user is logged in
  var isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };

  /* Route for getting current user */
  app.get('/api/user', function(req, res) {
    res.send(req.isAuthenticated() ? { user: req.user } : { message: 'No user signed in' });
  });

  /* Route for log-in */
  app.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.render('home', { user: req.user });
    });

  /* Route for sign-up */
  app.get('/signup', 
    function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/');
      } else {
        next();
      }
    },
    UserController.getSignUp
  );
  app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }),
    function(req, res) {
      res.render('home', { user: req.user });
    });

  /* Route for log-out */
  app.post('/logout', function(req, res) {
    req.logout();
    res.render('home', { user: req.user });
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('home', { user: req.user });
  });

};
