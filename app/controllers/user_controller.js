module.exports = (function() {

  var async = require("async");

  var unlinkCallback = function(social_network, req, res) {
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

  return {
    getSignUp: function(req, res) {
      res.render("users/sign_up");
    },
    getLogIn: function(req, res) {
      res.render("users/sign_in");
    },
    getAccount: function(req, res) {
      res.render("users/account");
    },
    resetPassword: function(req, res, next) {
      var validPassword = req.user.validPassword(req.body.current_password);
      var match = req.body.password == req.body.password_confirmation;

      async.waterfall([
        function(done) {
           if (!validPassword) {
            req.flash("error", "You did not enter a valid password");
            done();
          } else if (!match) {
            req.flash("error", "The passwords you entered did not match");
            done();
          } else {
            req.user.set("password", req.body.password);
            req.user.save(function(err) {
              if (err) {
                req.flash("error", err);
              } else {
                req.flash("success", "Your password has been changed.");  
              }
              done();
            });
          }
        }
      ], 
      function(err) {
        if (err) {
          return next(err);
        }
        res.redirect("/account");
      });
    },

    unlinkTwitter: function(req, res) {
      var user = req.user;
      user.twitter.token = undefined;
      user.twitter.profile = undefined;
      user.save(unlinkCallback("Twitter", req, res));
    },

    unlinkFacebook: function(req, res) {
      var user = req.user;
      user.facebook.token = undefined;
      user.save(unlinkCallback("Facebook", req, res));
    },

    unlinkGoogle: function(req, res) {
      var user = req.user;
      user.google.token = undefined;
      user.save(unlinkCallback("Google", req, res));
    },

    unlinkFoursquare: function(req, res) {
      var user = req.user;
      user.foursquare.token = undefined;
      user.foursquare.profile = undefined;
      user.save(unlinkCallback("Foursquare", req, res));
    }
  };

})();