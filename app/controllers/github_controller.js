module.exports = (function() {

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
      });
    },

    getRateLimit: function(req, res, nex) {
      req.user.GithubApi().get("rate_limit", function(data) {
        res.render("social/github/rate_limit", { 
          data: data.resources
        });
      });
    }

  };

})();