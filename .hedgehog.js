module.exports = (function() {

  return {

    port: 4000,

    appName: "Hedgehog",

    social: {
      useFacebook: true,
      useTwitter: true,
      useGoogle: true,
      useFoursquare: true
    },


    sessionSecret: process.env.SESSION_SECRET,

    oauth: {
      Facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
      },
      Twitter: {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
      },
      Google: {
        realm: process.env.GOOGLE_REALM,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      Foursquare: {
        client_id: process.env.FOURSQUARE_CLIENT_ID,
        client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
        callback_url: process.env.FOURSQUARE_CALLBACK_URL
      }
    },
    
    db: {
      test: 'mongodb://localhost/hedgehog-test',
      development: 'mongodb://localhost/hedgehog-dev',
      production: 'mongodb://localhost/hedgehog-prod',
      sessionStore: 'mongodb://localhost/hedgehog-session'
    },

    mailer: {
      email: process.env.MAILER_EMAIL,
      service: process.env.MAILER_SERVICE,
      username: process.env.MAILER_USERNAME,
      password: process.env.MAILER_PASSWORD
    }
  
  };

})();