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

  /* Route for log-in */
  app.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/profile');
    });

  /* Route for sign-up */
  app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/profile');
    });

  /* Route for log-out */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('index', { user: req.user });
  });

};
