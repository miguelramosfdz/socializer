exports.setup = function(app) {
  "use strict";
  
  var passport = require('passport');
  var passportConfig = require('./passport');
  var MainController = require('../app/controllers/main_controller');
  var UserController = require('../app/controllers/user_controller');
  var TwitterController = require('../app/controllers/twitter_controller');
  var FoursquareController = require('../app/controllers/foursquare_controller');
  
  // Serve templates
  app.get('/templates/:type/:name', MainController.serveTemplates);

  /**
   * Foursquare Authorize routes
   */
  app.get('/auth/foursquare', FoursquareController.authorize);
  app.get('/auth/foursquare/callback', FoursquareController.getCallback);

  /**
   * Foursquare search routes
   */
  app.get('/foursquare/search', FoursquareController.getSearch);
  app.post('/foursquare/search/user', FoursquareController.postSearch);

  /**
   * User routes
   */
  app.get('/login', UserController.getLogin);
  app.post('/login', UserController.postLogin);
  app.get('/logout', UserController.logout);
  app.get('/forgot', UserController.getForgot);
  app.post('/forgot', UserController.postForgot);
  app.get('/reset/:token', UserController.getReset);
  app.post('/reset/:token', UserController.postReset);
  app.get('/signup', UserController.getSignup);
  app.post('/signup', UserController.postSignup);
  app.get('/account', passportConfig.isAuthenticated, UserController.getAccount);
  app.post('/account/profile', passportConfig.isAuthenticated, UserController.postUpdateProfile);
  app.post('/account/password', passportConfig.isAuthenticated, UserController.postUpdatePassword);
  app.post('/account/delete', passportConfig.isAuthenticated, UserController.postDeleteAccount);
  app.get('/account/unlink/:provider', passportConfig.isAuthenticated, UserController.getOauthUnlink);

  /**
   * API examples routes.
   */
  // app.get('/api/twilio', apiController.getTwilio);
  // app.post('/api/twilio', apiController.postTwilio);
  // app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
  // app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
  // app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
  // app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
  // app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
  // app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
  // app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
  // app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);

  /**
   * OAuth sign-in routes.
   */
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  /**
   * Twitter routes
   */
  app.get('/twitter/search', TwitterController.getSearch);
  app.post('/twitter/search', TwitterController.postSearch);

  // Serve error page
  app.get('/error', MainController.error);

  // Serve home page
  app.get('*', MainController.root);
  
  // Set responce for OPTIONS call
  app.options("*", MainController.options);

};