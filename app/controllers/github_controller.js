module.exports = (function() {

  var _ = require("underscore");
  var REST = require('restler');

  return {

    get: function(req, res, next) {
      if (req.user.github.token) {
        res.render('social/github');
      }
    },

    getIssues: function(req, res, next) {
      req.user.GithubApi().get("issues", function(data) {
        res.json(data);
      }, true);
    },

    getIssue: function(req, res, next) {
      req.user.GithubApi().get(req.body.url, function(data) {
        res.status(200).json(data);
      }, false);
    },

    getRateLimit: function(req, res, nex) {
      req.user.GithubApi().get("rate_limit", function(data) {
        res.render("social/github/rate_limit", { 
          data: data.resources
        });
      }, true);
    }

  };

})();