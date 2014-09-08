module.exports = (function() {
  'use strict';

  var REST = require('restler');

  /**
   * Module dependencies.
   */
  var mongoose = require('mongoose');
  var crypto = require('crypto');
  var Schema = mongoose.Schema;

  /**
   * @desc User Schema
   * @type {mongoose.Schema}
   */
  var UserSchema = new Schema({
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    hashed_password: { 
      type: String, 
      required: true 
    },
    salt: { 
      type: String, 
      required: true 
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        tokenSecret: String,
        displayName: String,
        username: String,
        profile: Schema.Types.Mixed
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    foursquare: {
        id: String,
        token: String,
        email: String,
        name: String,
        profile: Schema.Types.Mixed
    },
    github: {
      id: String,
      token: String,
      email: String,
      name: String,
      profile: Schema.Types.Mixed
    },
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

    GithubApi: function() {
      var user = this;
      
      return {
        get: function(path, callback, needBase) {
          if (needBase) {
            REST.get([
            "https://api.github.com/", path,
            "?access_token=", user.github.token
            ].join("")).on("complete", callback);
          } else {
            REST.get([
              path, "?access_token=", user.github.token
            ].join("")).on("complete", callback);
          }
        },
        post: function(path, options) {

        }
      };
    },

    /**
     * @desc Get Foursquare first name and last name
     * @return {String}
     * @api public
     */
    foursquareName: function foursquareName() {
      var profile = this.foursquare.profile;
      return profile.firstName + " " + profile.lastName;
    },

    foursquarePhoto: function foursquarePhoto() {
      var url = require('url');
      var profile = this.foursquare.profile;
      return url.resolve(profile.photo.prefix, '/img/user'+profile.photo.suffix);
    },

    setTwitterProfile: function(token, secret, profile, callback) {
      this.twitter.token = token;
      this.twitter.tokenSecret = secret;
      this.twitter.profile = profile;
      this.save(callback);
    },
    
    setFoursquareProfile: function(access_token, profile, callback) {
      this.foursquare.token = access_token;
      this.foursquare.profile = profile;
      this.save(callback);
    },

    getFoursquareParams: function() {
      return '?oauth_token='+this.foursquare.token+'&v=20140714';
    },

    setGithubProfile: function(token, profile, callback) {
      this.github.token = token;
      this.github.profile = profile;
      this.save(callback);
    },

    is_connected: function() {
      return this.foursquare.token || 
              this.facebook.token ||
              this.google.token ||
              this.twitter.token;
    },

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

  return mongoose.model('User', UserSchema);

})();
