module.exports = (function() {
  "use strict";

  return {
    Twitter: {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET 
    },
    Foursquare: {
      clientId: process.env.FOURSQUARE_ID,
      clientSecret: process.env.FOURSQUARE_SECRET,
      redirectUrl: process.env.FOURSQUARE_REDIRECT
    }
  };


})();