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
			dev: 'mongodb://localhost/hedgehog-dev',
			test: 'mongodb://localhost/hedgehog-test',
			prod: 'mongodb://localhost/hedgehog-prod',
			sessionStore: 'mongodb://localhost/hedgehog-session'
		},
		sessionSecret: process.env.SESSION_SECRET
	};

})();