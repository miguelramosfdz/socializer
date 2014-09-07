var REST = require('restler');
var Keys = require('../../.hedgehog').oauth.Foursquare;

var oauth_url = "https://foursquare.com/oauth2/";

var Foursquare = {

  authenticate: function() {
    REST.get(oauth_url+"authenticate", {
      response_type: "code",
      client_id: Keys.client_id,
      redirect_uri: Keys.callback_url
    }).on('complete', function(data) {
      console.log(data);
    });
  },

  getRequestToken: function(code, cb) {
    REST.get(oauth_url+"access_token", {
      code: code,
      client_id: Keys.client_id,
      client_secret: Keys.client_secret,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    }).on('complete', cb);
  }

};

exports = module.exports = Foursquare;
