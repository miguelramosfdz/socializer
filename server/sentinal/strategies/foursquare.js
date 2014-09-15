module.exports = function() {
  
  var Foursquare = function() {
    var self = this;
    var oauth = require('oauth');
    var REST = require('restler');

    self.request_token_url = "https://foursquare.com/oauth2/authenticate";
    self.access_token_url = "https://foursquare.com/oauth2/access_token";
    self.profile_url = "https://api.foursquare.com/v2/users/self";
    self.version = "&v=20140806";

    self.client_id = Hedgehog.oauth.Foursquare.client_id;
    self.client_secret = Hedgehog.oauth.Foursquare.client_secret;
    self.callback_url = Hedgehog.oauth.Foursquare.callback_url;

    self.consumer = new oauth.OAuth2(
      self.client_id,
      self.client_secret,
      "https://foursquare.com/oauth2/",
      "authenticate",
      "access_token",
      null
    );

    self.authorize = function(req, res, next) {
      res.redirect([
        "https://foursquare.com/oauth2/authenticate?",
        "response_type=code",
        "&client_id=", self.client_id,
        "&redirect_uri=", self.callback_url
      ].join(''));
    };

    self.authorize_callback = function(callback) {
      return function(req, res, next) {
        self.consumer.getOAuthAccessToken(
          req.query.code,
          {
            redirect_uri: self.callback_url,
            grant_type:'authorization_code'
          },
          function(e, access_token, refresh_token, results) {
            if (e) {
              req.flash("error", "Error getting Foursquare access token.");
              res.redirect("/account");
            } else {
              /**
               * Save token and profile to user
               */
              self.get_profile(access_token, function(data) {
                var profile = data.response.user;
                return callback(access_token, profile, req, res, next);
              });
            }
          });
      };
    };

    self.get_profile = function(access_token, callback) {
      if (access_token) {
        REST.get([
          self.profile_url,
          "?oauth_token=", access_token,
          self.version
        ].join("")).on("complete", callback);
      }
    };
  };

  return new Foursquare();
};
