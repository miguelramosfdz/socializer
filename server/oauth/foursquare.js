var REST = require('restler');

// exports.Foursquare = function Foursquare(keys) {
//   if (!keys.client_id) throw new Error("Foursquare requires client_id");
//   if (!keys.client_secret) throw new Error("Foursquare requires client_secret");
//   if (!keys.redirect_uri) throw new Error("Foursquare requires redirect_uri");
//   this.base_url = 
//   this.client_id = keys.client_id;
//   this.client_secret = keys.client_secret;
//   this.redirect_uri = keys.redirect_uri;
// };

// exports.Foursquare.prototype.authenticate = function() {

// };

var Foursquare = {

  keys: require('../../.hedgehog').oauth.Foursquare,

  base_url: "https://foursquare.com/oauth2/",

  profileUrl: "https://api.foursquare.com/v2/users/self",

  version: "&v=20140806",

  authenticate: function(req, res, next) {
    res.redirect([
      Foursquare.base_url,"authenticate?",
      "response_type=code",
      "&client_id=", Foursquare.keys.client_id,
      "&redirect_uri=", Foursquare.keys.callback_url
    ].join(''));
  },

  getRequestToken: function(req, res, next) {
    REST.get([
      Foursquare.base_url,"access_token?",
      "code=", req.query.code,
      "&client_id=", Foursquare.keys.client_id,
      "&client_secret=", Foursquare.keys.client_secret,
      "&redirect_uri=", Foursquare.keys.callback_url,
      "&grant_type=authorization_code"
    ].join('')).on('complete', function(data) {
      if (data.access_token) {
        var user = req.user;
        user.foursquare.token = data.access_token;
        user.save(function(err) {
          if (err) {
            return err;
          }
          req.flash("success", "Foursquare account authenticated!");
          res.redirect("/account");
        });
      } else {
        req.flash("error", "Could not authenticate Foursquare account.");
        res.redirect("/account");
      }
    });
  },

  getProfile: function(req, res, next) {
    REST.get([
      Foursquare.profileUrl,
      "?oauth_token=",req.user.foursquare.token,
      Foursquare.version
    ].join("")).on("complete", function(data) {
      if (data.response.user) {
        var user = req.user;
        user.foursquare.profile = data.response.user;
        user.save(function(err) {
          if (err) {
            req.flash("error", "Foursquare profile could not be saved.");
            res.redirect("/account");
          } else {
            req.flash("success", "Foursquare profile saved!");
            res.redirect("/account");
          }
        });
      } else {
        req.flash("error", "Foursquare profile could not be found.");
        res.redirect("/account");
      }
    });
  }

};

exports = module.exports = Foursquare;
