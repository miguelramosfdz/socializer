"use strict";

module.exports = {
	Facebook: {
		appId: "239021659596205",
		appSecret: "cb8b5c54f642a455643da995df69f5ae",
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	Twitter: {
		consumerKey: "aQEFfEx1s7hASeQPvA8og",
		consumerSecret:	"ZXF89Cm27Mfsgwq00ck8qsfzzGPp5Ld8sDSnOeekYIg",
		accessToken: "966006937-Vvyyc2TXyVLuo7c5WTGI7O5rnpNkRirH5au6atAO",
		accessSecret:	"zSigU2bZuaCp61mUMkhhq3iwg07TojCVfGEl6PbevHVAJ",
		callbackURL: "http://localhost:3000/auth/twitter/callback"
	},
	Github: {
		clientID: "get_your_own",
		clientSecret: "get_your_own",
		callbackURL: "http://localhost:3000/auth/github/callback"
	},
	Google: {
		returnURL: "http://127.0.0.1:1337/auth/google/callback",
		realm: "http://localhost:3000"
	}
};