module.exports = (function() {
  "use strict";

  return {
    Twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET 
    }
  };


})();