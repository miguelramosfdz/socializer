exports.setup = function (server) {

  var twitter = require('../app/controllers/twitter');

  // Serve templates
  server.get('/templates/:type/:name', function ( req, res, next ) {
    res.render('templates/' + req.params.type + '/' + req.params.name);
  });

  // Search Twitter
  server.get('/twitter/search', function(req, res, next) {
    res.render('templates/twitter', { layout: 'index' });
  });

  server.post('/twitter/search', twitter.search);

  // Serve error page
  server.get('/error', function ( req, res, next ) {
    res.render('static/error');
  });

  // Serve home page
  server.get('*', function ( req, res, next ) {
    res.render('index');
  });
  
  // Set responce for OPTIONS call
  server.options("*", function (req, res) {
    res.send("");
  });

};