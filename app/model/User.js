'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	hashed_password: String,
	provider: String,
	salt: String,
	facebook: {},
	twitter: {}
});

/**
 * Virtuals
 */
UserSchema.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
	return value && value.length;
};

var validateIsStringAndLength = function(value) {
	return typeof value === 'string' && value.length > 0;
};

/**
 * Validations for LocalStrategy
 */
UserSchema.path('name').validate(function(name) {
	if (!this.provider) return true;
	return (validateIsStringAndLength(name));
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
	if (!this.provider) return true;
	return (validateIsStringAndLength(email));
}, 'Email cannot be blank');

UserSchema.path('username').validate(function(username) {
	if (!this.provider) return true;
	return (validateIsStringAndLength(username));
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
	if (!this.provider) return true;
	return (validateIsStringAndLength(hashed_password));
}, 'Password cannot be blank');


// Pre-save hook
UserSchema.pre('save', function(next) {
	if (!this.isNew) return next();

	if (!validatePresenceOf(this.password) && !this.provider)
		next(new Error('Invalid password'));
	else
		next();
});

/**
 * Methods
 */
UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

module.exports = mongoose.model('User', UserSchema);