module.exports = (function() {

  var REST = require("restler");
  
  return {

    get: function(req, res, next) {
      if (req.user.foursquare.token) {
        res.render('social/foursquare');
      } else {
        res.redirect('/');
        res.end();
      }
    },
   
    getCheckins: function(req, res, next) {      
      REST.get([
        'https://api.foursquare.com/v2/users/self/checkins',
        req.user.getFoursquareParams()
      ].join('')).on('complete', function(data, response) {
        res.json(200, data);
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