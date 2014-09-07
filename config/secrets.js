module.exports = (function() {
  "use strict";

  return {

    sessionSecret: process.env.SOCIALIZER_SECRET, 
    
    db: process.env.SOCIALIZER_DB,
    
    /**
     * Facebook API configuration
     * @type {Object}
     */
    Facebook: {
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackUrl: process.env.FACEBOOK_CALLBACK_URL
    },

    /**
     * Twitter API configuration
     * @type {Object}
     */
    Twitter: {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
      callbackUrl: process.env.TWITTER_CALLBACK_URL
    },
    
    /**
     * Foursquare API configuration
     * @type {Object}
     */
    Foursquare: {
      clientId: process.env.FOURSQUARE_ID,
      clientSecret: process.env.FOURSQUARE_SECRET,
      redirectUrl: process.env.FOURSQUARE_REDIRECT
    },

    /**
     * Google API configuration
     * @type {Object}
     */
    Google: {
      returnURL: process.env.GOOGLE_CALLBACK_URL,
      realm: process.env.GOOGLE_REALM
    }

  };


})();