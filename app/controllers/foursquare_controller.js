module.exports = (function() {

  var REST = require('restler');
  var tokens = require('../../config/tokens');
  var node_foursquare = require('node-foursquare');
  var Foursquare = node_foursquare({ secrets: tokens.Foursquare });

  /**
   * Base Foursquare API URI
   * @type {String}
   */
  var base_uri = 'https://api.foursquare.com/v2/';

  var getOauth = function() {
    return '&oauth_token='+tokens.Foursquare.oauth_token+'&v=20140714';
  };

  /**
   * Oauth param
   * @type {String}
   */
  var oauth_token = Foursquare.clientId;

  return {
    
    getCallback: function(req, res, next) {
      Foursquare.getAccessToken({
        code: req.query.code
      }, function (error, accessToken) {
        if(error) {
          res.send('An error was thrown: ' + error.message);
        }
        else {
          tokens.Foursquare.oauth_token = accessToken;
          
        }
      });
    },
    
    authorize: function(req, res) {
      res.writeHead(303, { location: Foursquare.getAuthClientRedirectUrl() });
      res.end();
    },

    getSearch: function(req, res, next) {
      if (tokens.Foursquare.oauth_token) {
        res.render('foursquare/search', { layout: true });
      } else {
        res.redirect('/auth/foursquare');
        res.end();
      }
    },
    
    postSearch: function(req, res, next) {
      var oauth_token = tokens.Foursquare.oauth_token;
      if (oauth_token) {
        var url = base_uri+'users/search?email='+req.body.email;
        REST.get(url+getOauth())
          .on('complete', function(data, response) {
            var user = data.response.results[0];
            if (user && user.id) {
              REST.get(base_uri+'/users/'+user.id+'/checkins?'+getOauth())
                .on('complete', function(data, response) {
                  res.json(200, data);
                });
            } else {
              res.send(500, data);
            }
          });  
      } else {
        res.writeHead(303, { location: Foursquare.getAuthClientRedirectUrl() });
        res.end();
      }
    }
  };

})();