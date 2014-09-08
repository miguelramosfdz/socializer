module.exports = (function() {

  var REST = require("restler");
  
  return {
   
    getCheckins: function(req, res, next) {      
      REST.get([
        'https://api.foursquare.com/v2/users/self/checkins',
        req.user.getFoursquareParams()
      ].join('')).on('complete', function(data, response) {
        res.status(200).json(data);
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