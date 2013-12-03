exports.setup = function ( server ) {

  var twitter = require('../app/controllers/twitter');

  // Serve home page
  server.get('/', function ( req, res, next ) {
    res.render('index');
  });

  // Serve templates
  server.get('/templates/:type/:name', function ( req, res, next ) {
    res.render('templates/' + req.params.type + '/' + req.params.name);
  });

  server.post('/twitter/search', twitter.search);

  // Serve error page
  server.get('/error', function ( req, res, next ) {
    res.render('static/error');
  });

}