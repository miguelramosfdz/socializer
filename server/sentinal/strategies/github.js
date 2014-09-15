module.exports = function() {
  
  var Github = function() {
    var self = this;
    var REST = require('restler');
    var qs = require("querystring");

    self.request_token_url = "https://github.com/login/oauth/authorize";
    self.access_token_url = "https://github.com/login/oauth/access_token";
    self.profile_url = "https://api.github.com/user?";

    self.client_id = Hedgehog.oauth.Github.client_id;
    self.client_secret = Hedgehog.oauth.Github.client_secret;
    self.callback_url = Hedgehog.oauth.Github.callback_url;

    self.authorize = function(req, res, next) {
      res.redirect([
        self.request_token_url,"?",
        "client_id=", self.client_id,
        "&scope=", "user,repo",
        "&redirect_uri=", self.callback_url,
        "&state=", res.locals._csrf
      ].join(''));
    };

    self.authorizeCallback = function(callback) {
      return function(req, res, next) {
        REST.post(self.access_token_url, {
          query: {
            client_id: self.client_id,
            client_secret: self.client_secret,
            code: req.query.code,
            redirect_uri: self.callback_url
          }
        }).on("complete", function(data) {
          var query = qs.parse(data);
          var access_token = query.access_token;
          
          /**
           * Save token and profile to user
           */
          self.get_profile(access_token, function(profile) {
            return callback(access_token, profile, req, res, next);
          });
        });
      };
    };

    self.get_profile = function(access_token, callback) {
      REST.get(self.profile_url + qs.stringify({
        access_token: access_token
      })).on("complete", callback);
    };
  };

  return new Github();
};
