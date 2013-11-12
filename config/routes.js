exports.setup = function ( app, passport, express ) {

  var users = require('../app/controllers/users_controller');

  // Authorizes routes
  var auth = function ( req, res, next ){
    return (req.isAuthenticated() ? next() : res.send(401));
  };

  // Serve home page
  app.get('/', function ( req, res, next ) {
    res.render('layout');
  });

  // Serve templates
  app.get('/templates/:type/:name', function ( req, res, next ) {
    res.render('templates/' + req.params.type + '/' + req.params.name);
  });

    // User Creation, Log In, & Log Out
  app.post('/sign_up', users.sign_up);
  app.post('/sign_in', users.sign_in);
  app.post('/sign_out', users.sign_out);
  app.get('/loggedin', users.is_signed_in );

  // Serve error page
  app.get('/error', function ( req, res, next ) {
    res.render('static/error');
  })

}