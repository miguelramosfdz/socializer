module.exports = (function() {
  "use strict";

  var Twit = require('twit');
  var secrets = require('../../config/secrets');

  var Twitter = new Twit({
    consumer_key: secrets.Twitter.apiKey,
    consumer_secret: secrets.Twitter.apiSecret,
    access_token: secrets.Twitter.accessToken,
    access_token_secret: secrets.Twitter.accessSecret
  });

  return {

    getSearch: function(req, res, next) {
      res.render('twitter/search', { layout: true });
    },

  	postSearch: function(req,res,next) {
  		Twitter.get('search/tweets', {
  			q: req.body.query,
  			geocode: req.body.geo,
  			count: 50
  		}, function(err, data) {
  			return res.json(200, { tweets: data });
  		});
  	}

  };

})();