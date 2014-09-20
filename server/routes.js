/* jshint strict:true */

exports.setup = function(app) {
  "use strict";

  /**
   * Oauth Strategies
   */
  var TwitterOauth = Sentinal.strategies.Twitter();
  var GithubOauth = Sentinal.strategies.Github();
  var FoursquareOauth = Sentinal.strategies.Foursquare();
  var FacebookOauth = Sentinal.strategies.Facebook();
  var GoogleOauth = Sentinal.strategies.Google();

  /**
   * Controllers
   */
  var AppController = require("../app/controllers/app_controller");
  var ApiController = require("../app/controllers/api_controller");
  var UserController = require("../app/controllers/user_controller");
  var FoursquareController = require("../app/controllers/foursquare_controller");
  var GithubController = require("../app/controllers/github_controller");

  // User --------------------------------------------------------------
  app.get("/account", Sentinal.isLoggedIn, UserController.getAccount);
  app.get("/account/delete", Sentinal.isLoggedIn, UserController.deleteAccount);
  app.post("/reset-password", Sentinal.isLoggedIn, UserController.resetPassword);
  
  // Log Out
  app.get("/logout", UserController.logOut);

  // Local Log In -------------------------------
  app.get("/login", Sentinal.isNotLoggedIn, UserController.getLogIn);
  app.post("/login", Sentinal.isNotLoggedIn, UserController.logIn);

  // Local Sign Up
  app.get("/signup", Sentinal.isNotLoggedIn, UserController.getSignUp);
  app.post("/signup", Sentinal.isNotLoggedIn, UserController.signUp);

  // Facebook ---------------------------------
  app.get("/auth/facebook", FacebookOauth.authorize);
  app.get("/auth/facebook/callback", 
    FacebookOauth.authorize_callback(UserController.linkFacebook));
  app.get("/unlink/facebook", Sentinal.isLoggedIn, UserController.unlinkFacebook);

  // Google ---------------------------------
  app.get("/auth/google", GoogleOauth.authorize);
  app.get("/auth/google/callback", GoogleOauth.authorize_callback(UserController.linkGoogle));
  app.get("/unlink/google", Sentinal.isLoggedIn, UserController.unlinkGoogle);

  // Twitter --------------------------------
  app.get("/auth/twitter", Sentinal.isLoggedIn, TwitterOauth.authorize);
  app.get("/auth/twitter/callback", 
    Sentinal.isLoggedIn, 
    TwitterOauth.authorizeCallback(UserController.linkTwitter));
  app.get("/unlink/twitter", Sentinal.isLoggedIn, UserController.unlinkTwitter);

  // Foursquare -------------------------------
  app.get("/auth/foursquare", Sentinal.isLoggedIn, FoursquareOauth.authorize);
  app.get("/auth/foursquare/callback", 
    Sentinal.isLoggedIn,
    FoursquareOauth.authorize_callback(UserController.linkFoursquare));
  app.get("/unlink/foursquare", Sentinal.isLoggedIn, UserController.unlinkFoursquare);

  // Github -------------------------------
  app.get("/auth/github", Sentinal.isLoggedIn, GithubOauth.authorize);
  app.get("/auth/github/callback", 
    Sentinal.isLoggedIn,
    GithubOauth.authorizeCallback(UserController.linkGithub));
  app.get("/unlink/github", Sentinal.isLoggedIn, UserController.unlinkGithub);

  // API -------------------------------
  app.get("/api/me", ApiController.getMe);

  app.get('/api/foursquare/checkins', FoursquareController.getCheckins);
  app.get("/api/github/issues", GithubController.getIssues);
  app.get("/api/github/repos", GithubController.getRepos);

  // App Routes
  app.get("*", AppController.getCatchAll);
  app.get("/about", AppController.getAbout);

};
