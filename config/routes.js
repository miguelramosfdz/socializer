exports.setup = function (server) {

  var TwitterController = require('../app/controllers/twitter');
  var MainController = require('../app/controllers/main_controller');

  // Serve templates
  server.get('/templates/:type/:name', MainController.serveTemplates);

  
  server.get('/twitter/search', TwitterController.getSearch);
  server.post('/twitter/search', TwitterController.postSearch);

  // Serve error page
  server.get('/error', MainController.error);

  // Serve home page
  server.get('*', MainController.root);
  
  // Set responce for OPTIONS call
  server.options("*", MainController.options);

};