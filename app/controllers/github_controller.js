module.exports = (function() {

  var REST = require('restler');

  return {

    get: function(req, res, next) {
      if (req.user.github.token) {
        res.render('social/github');
      } else {
        res.redirect('/');
        res.end();
      }
    },

    getIssues: function(req, res, next) {
      REST.get([
        "https://api.github.com/issues",
        "?access_token=", req.user.github.token
      ].join('')).on("complete", function(data) {
        res.json(data);
      });
    }

  };

})();