(function() {

  "use strict";

  var Twitter = require('twit');
  var tokens = require('../../config/tokens');

  var twitterClient = new Twitter({
    consumer_key: tokens.Twitter.consumerKey,
    consumer_secret: tokens.Twitter.consumerSecret,
    access_token: tokens.Twitter.accessToken,
    access_token_secret: tokens.Twitter.accessSecret
  });

  module.exports = {

    getSearch: function(req, res, next) {
      res.render('templates/twitter', { layout: 'index' });
    },

  	postSearch: function(req,res,next) {
  		twitterClient.get('search/tweets', {
  			q: req.body.query,
  			geocode: req.body.geo,
  			count: 50
  		}, function(err, data) {
  			return res.json(200, { tweets: data });
  		});
  	}

  };

})();