/* jshint strict:false */

exports.setup = function(app, passport) {
  "use strict";

  // Route for serving templates
  app.get('/partials/:type/:file', function(req, res) {
    res.render('partials/'+req.params.type+'/'+req.params.file);
  });

  // route middleware to make sure a user is logged in
  this.isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    res.send(401);
  };

  /* Route for getting current user */
  app.get('/api/user', function(req, res) {
    res.send(req.isAuthenticated() ? { user: req.user } : { message: 'No user signed in' });
  });

  /* Routes for log-in and sign-up */
  app.post('/login', passport.authenticate('local-login'));
  app.post('/signup', passport.authenticate('local-singup'));

  // Route for logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('index');
  });

};
