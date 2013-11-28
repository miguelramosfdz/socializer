exports.setup = function ( server ) {

  var users = require('../app/controllers/users_controller');

  // Authorizes routes
  var auth = function ( req, res, next ){
    return (req.isAuthenticated() ? next() : res.send(401));
  };

  // Serve home page
  server.get('/', function ( req, res, next ) {
    res.render('layout');
  });

  // Serve templates
  server.get('/templates/:type/:name', function ( req, res, next ) {
    res.render('templates/' + req.params.type + '/' + req.params.name);
  });

  // User Creation, Log In, & Log Out
  server.post('/signup', users.signup);
  server.post('/signin', users.signin);
  server.post('/signout', users.signout);
  server.get('/loggedin', users.is_signed_in );

  // Serve error page
  server.get('/error', function ( req, res, next ) {
    res.render('static/error');
  });

}