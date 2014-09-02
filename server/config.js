exports = module.exports = (function() {

	return {
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
			dev: 'mongodb://localhost/hogar-dev',
			test: 'mongodb://localhost/hogar-test',
			prod: 'mongodb://localhost/hogar-prod',
			sessionStore: 'mongodb://localhost/hogar-session'
		},
		sessionSecret: process.env.SESSION_SECRET
	};

})();