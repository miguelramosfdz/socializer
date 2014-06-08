'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * @desc User Schema
 * @type {mongoose.Schema}
 */
var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  hashed_password: { type: String, unique: true, required: true },
  salt: { type: String, unique: true, required: true }
});

/**
 * @desc Set user's salt and hashed_password
 */
UserSchema.virtual('password').set(function(password) {
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
});

/**
 * @desc User methods
 * @type {mongoose.Schema.methods}
 */
UserSchema.methods = {

  /**
   * @desc Check password
   * @param {String} password
   * @return {Boolean}
   * @api public
   */
  validPassword: function(password) {
    return this.encryptPassword(password) === this.hashed_password;
  },

  /**
   * @desc Make salt
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * @desc Encrypt password
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