module.exports = (function() {

  var REST = require("restler");
  
  return {
   
    getCheckins: function(req, res, next) {
      req.user.FoursquareApi()
        .get("users/self/checkins", function(data, response) {
          if (data.meta.code === 400) {
            res.status(400).json({ message: data.meta.errorDetail });
          } else {
            res.status(200).json(data);  
          }
        });
    },

    postSearch: function(req, res, next) {
      var oauth_token = tokens.Foursquare.oauth_token;
      if (oauth_token) {
        var url = base_uri+'users/search?email='+req.body.email;
      } else {
        getAutorization(req, res, next);
      }
    }
  };

})();