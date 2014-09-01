module.exports = (function() {
  "use strict";

  var Twit = require('twit');
  var tokens = require('../../config/tokens');

  var Twitter = new Twit({
    consumer_key: tokens.Twitter.apiKey,
    consumer_secret: tokens.Twitter.apiSecret,
    access_token: tokens.Twitter.accessToken,
    access_token_secret: tokens.Twitter.accessSecret
  });

  return {

    getSearch: function(req, res, next) {
      res.render('twitter/search', { layout: 'index' });
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