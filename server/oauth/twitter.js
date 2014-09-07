module.exports = function() {
  "use strict";

  var self = {};
  var async = require("async");
  var oauth = require("oauth");
  var REST = require("restler");
  
  self.request_token_url = "https://twitter.com/oauth/request_token";
  self.access_token_url = "https://twitter.com/oauth/access_token";

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
        req.session.oauthRequestToken = oauthToken; // we will need these values in the oauthCallback so store them on the session.
        req.session.oauthRequestTokenSecret = oauthTokenSecret;

        /**
         * keep track of the site id in the sesion for the callback.
         */
        req.session.siteId = req.params.siteId;
        req.session.apiKey = req.params.apiKey;
        req.session.siteToken = req.params.siteToken;

        res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
      }
    });
  };

  self.get_access_token = function(req, res, next) {
    self.consumer.getOAuthAccessToken(
      req.session.oauthRequestToken, 
      req.session.oauthRequestTokenSecret, 
      req.query.oauth_verifier, 
      function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (error) {
          req.flash("error", "Error getting Twitter access token.");
          res.redirect("/account");
        } else {
          /**
           * Clear req.session oauth values
           */
          delete req.session.oauthRequestToken;
          delete req.session.oauthRequestTokenSecret;

          /**
           * Save token and tokenSecret to user
           */
          var user = req.user;
          user.twitter.token = oauthAccessToken;
          user.twitter.tokenSecret = oauthAccessTokenSecret;
          user.save(function(err) {
            if (err) {
              return next(err);
            }
            req.flash("success", "Twitter account linked!");
            res.redirect("/account");
          });
        }
      }
    );
  };

  self.get_profile = function(req, res, next) {
    var user = req.user;
    self.consumer.get(
      "https://api.twitter.com/1.1/account/verify_credentials.json",
      user.twitter.token,
      user.twitter.tokenSecret,
      function(err, data) {
        user.twitter.profile = JSON.parse(data);
        user.save(function() {
          if (err) {
            req.flash("error", "Twitter profile could not be saved.");
            res.redirect("/account");
          }
          req.flash("success", "Twitter profile saved!");
          res.redirect("/account");
        });
      }
    );
  };

  return self;
}; 

