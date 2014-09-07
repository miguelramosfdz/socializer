module.exports = function() {
  "use strict";

  var self = {};
  var async = require("async");
  var oauth = require("oauth");
  var REST = require("restler");
  
  self.request_token_url = "https://twitter.com/oauth/request_token";
  self.access_token_url = "https://twitter.com/oauth/access_token";
  self.profile_url = "https://api.twitter.com/1.1/account/verify_credentials.json";
  self.authorize_url = "https://twitter.com/oauth/authorize?oauth_token=";
  
  /**
   * Twitter OAuth consumer
   * @type {oauth.OAuth}
   */
  self.consumer = new oauth.OAuth(
    self.request_token_url,
    self.access_token_url,
    Hedgehog.oauth.Twitter.consumer_key,
    Hedgehog.oauth.Twitter.consumer_secret,
    "1.0A",
    Hedgehog.oauth.Twitter.callback_url,
    "HMAC-SHA1"
  );

  self.get_request_token = function(req, res, next) {
    self.consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
      if (error) {
        req.flash("error", "Error getting Twitter request token.");
        res.redirect("/account");
      } else {
        self.oauthRequestToken = oauthToken;
        self.oauthRequestTokenSecret = oauthTokenSecret;

        res.redirect(self.authorize_url+self.oauthRequestToken);
      }
    });
  };

  self.get_access_token = function(req, res, next) {
    self.consumer.getOAuthAccessToken(
      self.oauthRequestToken, 
      self.oauthRequestTokenSecret, 
      req.query.oauth_verifier, 
      function(error, token, secret, results) {
        if (error) {
          req.flash("error", "Error getting Twitter access token.");
          res.redirect("/account");
        } else {
          /**
           * Clear req.session oauth values
           */
          delete self.oauthRequestToken;
          delete self.oauthRequestTokenSecret;

          /**
           * Save token and tokenSecret to user
           */
          self.consumer.get(
            self.profile_url,
            token,
            secret,
            function(err, data) {
              req.user.setTwitterProfile(
                token,
                secret,
                JSON.parse(data), function() {
                if (err) {
                  req.flash("error", "Twitter profile could not be saved.");
                  res.redirect("/account");
                }
                req.flash("success", "Twitter account linked!");
                res.redirect("/account");
              });
            }
          );
        }
      }
    );
  };

  return self;
}; 

