"use strict";

module.exports = function ( server ) {

  var users = require("../app/controllers/users_controller"),
      passport = require("passport");

  /** Serve home page */
  server.get("/", function ( req, res, next ) {
    res.render("index");
  });

  /** Serve templates */
  server.get("/templates/:type/:name", function ( req, res, next ) {
    res.render("templates/" + req.params.type + "/" + req.params.name);
  });

  /** User Creation, Log In, & Log Out */
  server.post("/signup", users.signup);
  server.post("/signin", users.signin);
  server.get("/signout", users.signout);
  server.get("/signedin", users.is_signed_in );


  /** Social Signin */
  server.get("/auth/facebook", passport.authenticate("facebook"));

  server.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );

  server.get("/auth/twitter", passport.authenticate("twitter"));

  server.get("/auth/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/signin"
    }),
    function (req, res, next) {
      res.redirect("/");
    }
  );

  server.get("/auth/google", passport.authenticate("google"));

  server.get("/auth/google/return",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );

  // Serve error page
  server.get("/error", function(req, res, next) {
    res.render("static/error");
  });

  server.get("*", function(req, res, next) {
    res.render("index");
  });

};