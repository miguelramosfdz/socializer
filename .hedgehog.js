module.exports = (function() {

  return {

    port: 4000,

    appName: "Socializer",

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
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        callback_url: process.env.TWITTER_CALLBACK_URL
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
      },
      Github: {
        client_id: process.env.GITHUB_APP_ID,
        client_secret: process.env.GITHUB_APP_SECRET,
        callback_url: process.env.GITHUB_CALLBACK_URL
      }
    },
    
    db: {
      test: 'mongodb://localhost/socializer-test',
      development: 'mongodb://localhost/socializer-dev',
      production: 'mongodb://localhost/socializer-prod',
      sessionStore: 'mongodb://localhost/socializer-session'
    },

    mailer: {
      email: process.env.MAILER_EMAIL,
      service: process.env.MAILER_SERVICE,
      username: process.env.MAILER_USERNAME,
      password: process.env.MAILER_PASSWORD
    }
  
  };

})();