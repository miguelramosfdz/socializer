"use strict";

var mongoose = require("mongoose"),
		bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
	name: { type: String },
	username: { type: String, limit: 20, required: true, unique: true, trim: true },
	password: { type: String, limit: 20, trim: true },
	email: { type: String, trim: true },
	signedUp: { type: Date, required: true, default: Date.now },
	updated: { type: Date, required: true, default: Date.now },
	provider: { type: String, default: 'local' },
	facebook: {},
	twitter: {},
	github: {},
	google: {},
	accessToken: { type: String }
});

UserSchema.pre("save", function(next) {
	if (this.provider === 'local') {
		var user = this;

		if(!user.isModified("password")) return next();

		bcrypt.genSalt(10, function(err, salt) {
			if(err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.isValidPassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

UserSchema.methods.generateRandomToken = function () {
	var chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
			token = new Date().getTime() + "_";
	for ( var x = 0; x < 16; x++ ) {
		var i = Math.floor( Math.random() * 62 );
		token += chars.charAt( i );
	}
	return token;
};

var User = mongoose.model("User", UserSchema);

module.exports = User;