module.exports = function() {
  
  var Facebook = function() {

    var self = this;
    var REST = require("restler");
    var qs = require("querystring");

    self.keys = Hedgehog.oauth.Facebook;

    self.oauth_route_url = "https://www.facebook.com/dialog/oauth?";
    self.access_token_url = "https://graph.facebook.com/oauth/access_token?";
    self.profile_url = "https://graph.facebook.com/me?";

    self.authorize = function(req, res, next) {
      res.redirect(self.oauth_route_url + qs.stringify({
        client_id: self.keys.app_id,
        state: res.locals._csrf,
        redirect_uri: self.keys.callback_url,
        scope: "public_profile,email"
      }));
    };

    self.authorize_callback = function(callback) {
      return function(req, res, next) {
        REST.get(self.access_token_url, {
          query: {
            client_id: self.keys.app_id,
            redirect_uri: self.keys.callback_url,
            client_secret: self.keys.app_secret,
            code: req.query.code
          }
        }).on("complete", function(data) {
          var query = qs.parse(data);
          var access_token = query.access_token;

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

  return new Facebook();

};