module.exports = function() {


  var Google = function() {
    
    var self = this;
    var qs = require("querystring");
    var REST = require("restler");

    self.keys = Hedgehog.oauth.Google;
    self.oauth_url = "https://accounts.google.com/o/oauth2/auth?";
    self.access_token_url = "https://accounts.google.com/o/oauth2/token?";
    self.profile_url = "https://www.googleapis.com/plus/v1/people/me?";

    self.authorize = function(req, res, next) {
      res.redirect(self.oauth_url+qs.stringify({
        response_type: "code",
        client_id: self.keys.client_id,
        redirect_uri: self.keys.redirect_uri,
        scope: "email profile"
      }));
    };

    self.authorize_callback = function(callback) {
      return function(req, res, next) {
        REST.post(self.access_token_url, {
          data: {
            code: req.query.code,
            client_id: self.keys.client_id,
            client_secret: self.keys.client_secret,
            redirect_uri: self.keys.redirect_uri,
            grant_type: "authorization_code"
          }
        }).on("complete", function(data) {
          var access_token = data.access_token;

          self.get_profile(access_token, function(profile) {
            return callback(access_token, profile, req, res, next);
          });
        });
      };
    };

    self.get_profile = function(access_token, callback) {
      REST.get(self.profile_url+qs.stringify({
        access_token: access_token
      })).on("complete", callback);
    };
  };

  return new Google();
};
