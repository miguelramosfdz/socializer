"use strict";

var tokens = require('../../config/tokens');

var twitter = require('twit');

var twitterClient = new twitter({
  consumer_key: tokens.twitter.consumerKey,
  consumer_secret: tokens.twitter.consumerSecret,
  access_token: tokens.twitter.accessToken,
  access_token_secret: tokens.twitter.accessSecret
});

module.exports = {

	search: function(req,res,next) {
		twitterClient.get('search/tweets', {
			q: req.body.query,
			geocode: req.body.geo,
			count: 50
		}, function(err, data) {
			return res.json(200, { tweets: data });
		})
	}

};