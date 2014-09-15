module.exports = (function() {

  var config =  {};

  config.port = 4000;

  config.appName = "Socializer";

  config.session_ttl = process.env.SESSION_TTL;
  config.sessionSecret = process.env.SESSION_SECRET;

  config.baseUrl = process.env.BASE_URL || "http://127.0.0.1";

  config.buildCallBackURL = function(service) {
    return config.baseUrl+":"+config.port+"/auth/"+service+"/callback";
  };

  config.social = {
    useFacebook: true,
    useTwitter: true,
    useGoogle: true,
    useFoursquare: true
  };

  config.oauth = {
    Facebook: {
      app_id: process.env.FACEBOOK_APP_ID,
      app_secret: process.env.FACEBOOK_APP_SECRET,
      callback_url: config.buildCallBackURL("facebook")
    },
    Twitter: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      callback_url: config.buildCallBackURL("twitter")
    },
    Google: {
      realm: process.env.GOOGLE_REALM,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: config.buildCallBackURL("google")
    },
    Foursquare: {
      client_id: process.env.FOURSQUARE_CLIENT_ID,
      client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
      callback_url: config.buildCallBackURL("foursquare")
    },
    Github: {
      client_id: process.env.GITHUB_APP_ID,
      client_secret: process.env.GITHUB_APP_SECRET,
      callback_url: config.buildCallBackURL("github")
    }
  };
    
  config.db = {
    test: 'mongodb://localhost/socializer-test',
    development: 'mongodb://localhost/socializer-dev',
    production: 'mongodb://localhost/socializer-prod',
    session_store: 'socializer-session'
  };

  config.mailer = {
    email: process.env.MAILER_EMAIL,
    service: process.env.MAILER_SERVICE,
    username: process.env.MAILER_USERNAME,
    password: process.env.MAILER_PASSWORD
  };

  return config;

})();