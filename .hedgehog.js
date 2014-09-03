module.exports = (function() {

  return {

    port: 4000,

    appName: 'Hedgehog',

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