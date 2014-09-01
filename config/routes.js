exports.setup = function (server) {
  "use strict";

  var TwitterController = require('../app/controllers/twitter');
  var MainController = require('../app/controllers/main_controller');
  var FoursquareController = require('../app/controllers/foursquare_controller');
  
  // Serve templates
  server.get('/templates/:type/:name', MainController.serveTemplates);

  /**
   * Foursquare Authorize routes
   */
  server.get('/auth/foursquare', FoursquareController.authorize);
  server.get('/auth/foursquare/callback', FoursquareController.getCallback);

  /**
   * Foursquare search routes
   */
  server.get('/foursquare/search', FoursquareController.getSearch);
  server.post('/foursquare/search/user', FoursquareController.postSearch);

  /**
   * Twitter routes
   */
  server.get('/twitter/search', TwitterController.getSearch);
  server.post('/twitter/search', TwitterController.postSearch);

  // Serve error page
  server.get('/error', MainController.error);

  // Serve home page
  server.get('*', MainController.root);
  
  // Set responce for OPTIONS call
  server.options("*", MainController.options);

};