/* jshint strict:true */

exports.setup = function(app, passport) {
  "use strict";

  var TwitterOauth = require("./oauth/twitter")();
  var FoursquareOauth = require("./oauth/foursquare")();
  var Authenticate = require("./authentication");
  var UserController = require("../app/controllers/user_controller");
  var FoursquareController = require("../app/controllers/foursquare_controller");

  // Route for serving templates
  app.get("/partials/:type/:file", function(req, res) {
    res.render("partials/"+req.params.type+"/"+req.params.file);
  });

  /* Route for getting current user */
  app.get("/api/user", function(req, res) {
    res.send(req.isAuthenticated() ? { user: req.user } : { message: "No user signed in" });
  });

  app.get("/account", Authenticate.isLoggedIn, UserController.getAccount);

  app.post("/reset-password", Authenticate.isLoggedIn, UserController.resetPassword);

  /* Route for log-in */
  app.get("/login", Authenticate.isNotLoggedIn, UserController.getLogIn);
  app.post("/login", passport.authenticate("local-login", { 
    successRedirect: "/account",
    failureRedirect: "/" 
  }));

  /* Route for sign-up */
  app.get("/signup", Authenticate.isNotLoggedIn, UserController.getSignUp);
  app.post("/signup", passport.authenticate("local-signup", { 
    successRedirect: "/account",
    failureRedirect: "/" 
  }));

  // facebook -------------------------------
  // send to facebook to do the authentication
  app.get("/auth/facebook", passport.authenticate("facebook", { 
    scope: "email" 
  }));

  // handle the callback after facebook has authenticated the user
  app.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/account",
    failureRedirect: "/"
  }));

  // Twitter --------------------------------
  app.get("/auth/twitter", Authenticate.isLoggedIn, TwitterOauth.get_request_token);
  app.get("/auth/twitter/callback", Authenticate.isLoggedIn, TwitterOauth.get_access_token);

  // Google ---------------------------------
  // send to google to do the authentication
  app.get("/auth/google", passport.authenticate("google", { 
    scope: "email profile"
  }));

  // the callback after google has authorized the user
  app.get("/auth/google/callback", passport.authenticate("google", { 
    failureRedirect: "/login"
  }), function(req, res) {
    res.redirect("/");
  });

  // Foursquare -------------------------------
  app.get("/auth/foursquare", Authenticate.isLoggedIn, FoursquareOauth.get_code);
  app.get("/auth/foursquare/profile", Authenticate.isLoggedIn, FoursquareOauth.get_profile);
  app.get("/auth/foursquare/callback", Authenticate.isLoggedIn, FoursquareOauth.get_access_token);

  // Unlink accounts
  app.get("/unlink/local", Authenticate.isLoggedIn, function(req, res) {
      var user = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function() {
          res.redirect("/profile");
      });
  });

  // Facebook -------------------------------
  app.get("/unlink/facebook", Authenticate.isLoggedIn, UserController.unlinkFacebook);

  // Twitter --------------------------------
  app.get("/unlink/twitter", Authenticate.isLoggedIn, UserController.unlinkTwitter);

  // Google ---------------------------------
  app.get("/unlink/google", Authenticate.isLoggedIn, UserController.unlinkGoogle);

  // Foursquare --------------------------------
  app.get("/unlink/foursquare", Authenticate.isLoggedIn, UserController.unlinkFoursquare);

  app.get("/foursquare", Authenticate.isLoggedIn, FoursquareController.get);
  app.get("/foursquare/checkins", Authenticate.isLoggedIn, FoursquareController.getCheckins);
  
  /* Route for log-out */
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Catch-all Route
  app.get("*", function(req, res){
    res.render("home", { user: req.user });
  });

};
