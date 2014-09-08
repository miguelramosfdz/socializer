module.exports = function() {
  
  var self = this;
  var REST = require('restler');

  self.request_token_url = "https://github.com/login/oauth/authorize";
  self.access_token_url = "https://github.com/login/oauth/access_token";
  self.profile_url = "https://api.github.com/user";

  self.client_id = Hedgehog.oauth.Github.client_id;
  self.client_secret = Hedgehog.oauth.Github.client_secret;
  self.callback_url = Hedgehog.oauth.Github.callback_url;

  self.get_code = function(req, res, next) {
    res.redirect([
      self.request_token_url,"?",
      "client_id=", self.client_id,
      "&scope=", "user,repo",
      "&redirect_uri=", self.callback_url,
      "&state=", res.locals._csrf
    ].join(''));
  };

  self.get_access_token = function(req, res, next) {
    REST.post(self.access_token_url, {
      headers: {
        'Accept': 'application/json'
      },
      query: {
        client_id: self.client_id,
        client_secret: self.client_secret,
        code: req.query.code,
        redirect_uri: self.callback_url
      }
    }).on("complete", function(data) {
      var access_token = data.access_token;
      /**
       * Save token and profile to user
       */
      self.get_profile(data.access_token, function(profile) {
        if (access_token) {
          req.user.setGithubProfile(access_token, profile, function(err) {
            if (err) {
              req.flash("error", "Github profile could not be saved.");
              res.redirect("/account");
            } else {
              req.flash("success", "Github account linked!");
              res.redirect("/account");              
            }
          });
        } else {
          req.flash("error", "Github profile could not be found.");
          res.redirect("/account");
        }
      });
    });
  };

  self.get_profile = function(access_token, callback) {
    REST.get([
      self.profile_url,
      "?access_token=", access_token
    ].join("")).on("complete", callback);
  };

  return self;
};
