module.exports = (function() {
  'use strict';
  
  var ctrl = {};
  var async = require("async");
  var UserEmails = require('../../app/views/emails/user_emails');

  ctrl.getSignUp = function(req, res) {
    res.render("users/sign_up");
  };
  
  ctrl.getLogIn = function(req, res) {
    res.render("users/sign_in");
  };
  
  ctrl.getAccount = function(req, res) {
    res.render("users/account");
  };
  
  ctrl.unlinkCallback = function(social_network, req, res) {
    return function(err) {
      if (err) {
        req.flash("error", social_network+" account could not be unlinked.");
        res.redirect("/account");
      } else{
        req.flash("success", social_network+" account unlinked!");
        res.redirect("/account");
      }
    };
  };

  ctrl.logIn = function(req, res, next) {
    App.User.findOne({ email: req.body.email }, function(err, user) {
      if (err)
        return next(err);

      if (!user) {
        req.flash("error", "User not found.");
        res.redirect("/login");
        return;
      }

      if (!user.validPassword(req.body.password)) {
        req.flash("error", "Oops! Wrong password.");
        res.redirect("/login");
        return;
      }

      req.login(user);
      req.flash("success", "Logged in.");
      res.redirect("/account");
    });
  };

  ctrl.logOut = function(req, res) {
    req.logout();
    res.redirect("/");
  };

  ctrl.signUp = function(req, res, next) {
    App.User.findOne({ email: req.body.email }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        req.flash("error", "That email is already taken.");
        res.redirect("/signup");
        return;
      }

      if (req.body.password != req.body.password_confirmation) {
        req.flash("error", "Passwords do not match");
        res.redirect("/signup");
        return;
      }

      var newUser = new App.User();
      newUser.username = req.body.username;
      newUser.email = req.body.email;
      newUser.set('password', req.body.password);
      newUser.save(function(err, user) {
        if (err) throw err;
        var email = UserEmails.sign_up;
        App.Mailer.sendMail(newUser.email, email.subject, email.text, email.html);
        req.login(user);
        req.flash("success", "Account created.");
        res.redirect("/account");
      });
    });
  };

  ctrl.resetPassword = function(req, res, next) {
    var validPassword = req.user.validPassword(req.body.current_password);
    var match = req.body.password == req.body.password_confirmation;

    if (!validPassword) {
      req.flash("error", "You did not enter a valid password");
      res.redirect("/account");
      return;
    } 

    if (!match) {
      req.flash("error", "The passwords you entered did not match");
      res.redirect("/account");
      return;
    }

    req.user.set("password", req.body.password);
    req.user.save(function(err) {
      if (err) {
        req.flash("error", err);
      } else {
        req.flash("success", "Your password has been changed.");  
      }
      res.redirect("/account");
    });
  };

  ctrl.linkTwitter = function(access_token, secret, profile, req, res, next) {
    req.user.setTwitter(access_token, secret, profile, function() {
      req.flash("success", "Twitter account linked!");
      res.redirect("/account");
    });
  };

  ctrl.unlinkTwitter = function(req, res) {
    req.user.unlinkTwitter(ctrl.unlinkCallback("Twitter", req, res));
  };

  ctrl.linkFacebook = function(access_token, profile, req, res) {
    if (!req.user) {
      // Find the user in the database based on their facebook id
      App.User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        /**
         * If there is an error, such as an issue with connecting
         * to the database, return it.
         */
        if (err) {
          req.flash("error", "Server Error.");
          res.redirect("/signup");
          return;
        }

        /**
         * If the user is found, then log them in
         */
        if (user) { 
          /**
           * User has been found so return that user.
           */
          req.flash("error", "Facebook account already linked.");
          res.redirect("/signup");
          return;
        } 

        /**
         * If there is no user found with that Facebook id, 
         * create a new one.
         * @type {User}
         */
        var newUser = new App.User();
        
        /**
         * Get user's Facebook profile
         */
        newUser.setFacebook(access_token, profile, function(err) {
            if (err) throw err;
            req.flash("success", "Account created.");
            res.redirect("/account");
        });
      });
      return;
    }

    /**
     * User already exists and is logged in, so we only have to link 
     * the accounts
     */
    req.user.setFacebook(access_token, profile, function(err) {
      if (err) throw err;
      req.flash("success", "Facebook account linked.");
      res.redirect("/account");
    });
  };

  ctrl.unlinkFacebook = function(req, res) {
    req.user.unlinkFacebook(ctrl.unlinkCallback("Facebook", req, res));
  };

  ctrl.linkGoogle = function(access_token, profile, req, res, next) {
    App.User.findOne({ email: profile.emails[0].value }, function(err, user) {
      if (err) return done(err);

      if (user) {
        /**
         * if there is a user id already but no token (user was linked at 
         * one point and then removed)
         */
        if (!user.google.token) {
          user.setGoogle(access_token, profile, function(err, user) {
            if (err) throw err;
            req.flash("success", "Google account linked.");
            res.redirect("/account");                    
          });
        }
      } else {
        var newUser = new App.User();
        newUser.setGoogle(access_token, profile, function(err, user) {
          if (err) throw err;
          req.flash("success", "Account created.");
          res.redirect("/account");
        });
      }
    });
  };

  ctrl.unlinkGoogle = function(req, res) {
    req.user.unlinkGoogle(ctrl.unlinkCallback("Google", req, res));
  };

  ctrl.linkFoursquare = function(access_token, profile, req, res, next) {
    req.user.setFoursquare(access_token, profile, function(err) {
      if (err) {
        req.flash("error", "Foursquare profile could not be saved.");
        res.redirect("/account");
      } else {
        req.flash("success", "Foursquare account linked!");
        res.redirect("/account");              
      }
    });
  };

  ctrl.unlinkFoursquare = function(req, res) {
    req.user.unlinkFoursquare(ctrl.unlinkCallback("Foursquare", req, res));
  };

  ctrl.linkGithub = function(access_token, profile, req, res, next) {
    App.User
        .find({ 'github.email': profile.email })
        .where('email').equals(profile.email)
        .exec(function(err, user) {
          req.user.setGithub(access_token, profile, function(err) {
            if (err) {
              req.flash("error", "Github profile could not be saved.");
              res.redirect("/account");
            } else {
              req.flash("success", "Github account linked!");
              res.redirect("/account");              
            }
          });
        });
  };

  ctrl.unlinkGithub = function(req, res) {
    req.user.unlinkGithub(ctrl.unlinkCallback("Github", req, res));
  };

  ctrl.deleteAccount = function(req, res, next) {
    App.User.remove({ _id: req.user.id }, ctrl.deleteAccountCallback(arguments));
  };

  ctrl.deleteAccountCallback = function(req, res, next) {
    return function(err) {
      if (err) return next(err);
      req.logout();
      req.flash("success", "Your account has been deleted.");
      res.redirect('/');
    };
  };

  return ctrl;

})();