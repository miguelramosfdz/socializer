/* jshint strict:false */

exports.setup = function(app, passport) {

  // Route for serving templates
  app.get('/partials/:type/:file', function(req, res) {
    res.render('partials/'+req.params.type+'/'+req.params.file);
  });

  // route middleware to make sure a user is logged in
  this.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      // if user is authenticated in the session, carry on
      next();
    } else {
      // if they aren't redirect them to the home page
      res.send(401);
    }
  };

  // Route for confirming if user is logged in
  app.get('/api/user', function(req, res) {
    res.send(req.isAuthenticated() ? { user: req.user } : { message: 'No user signed in' });
  });

  // Route to handle local authentication
  app.post('/api/user', passport.authenticate('local'));

  // Route for logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Catch-all Route
  app.get('*', function(req, res){
    res.render('index', {
      title: 'Boiler' ,
      user: req.isAuthenticated() ? req.user : null
    });
  });

};
