/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
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
    profile: Schema.Types.Mixed
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
    profile: Schema.Types.Mixed
  },
  foursquare: {
    id: String,
    token: String,
    email: String,
    name: String,
    profile: Schema.Types.Mixed
  },
  github: {
    email: String,
    token: String,
    profile: Schema.Types.Mixed
  }
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
   * @desc Get user's Foursquare profile first name and last name
   * @return {String}
   * @api public
   */
  foursquareName: function() {
    var profile = this.foursquare.profile;
    return profile.firstName + " " + profile.lastName;
  },

  /**
   * @desc Get user's Foursquare profile photo
   * @return {String}
   * @api public
   */
  foursquarePhoto: function() {
    var url = require('url');
    var profile = this.foursquare.profile;
    return profile.photo.prefix+'original'+profile.photo.suffix;
  },

  /**
   * @desc Link user's Facebook account
   * @param {String} access_token
   * @param {Object} profile
   * @param {Function} callback
   * @api public
   */
  setFacebook: function(access_token, profile, callback) {
    this.facebook.id = profile.id;
    this.facebook.token = access_token;
    this.facebook.profile = profile;
    this.save(callback);
  },

  /**
   * @desc Unlink user's Facebook account
   * @param {Function} callback
   * @api public
   */
  unlinkFacebook: function(callback) {
    this.facebook.token = undefined;
    this.facebook.profile = undefined;
    this.save(callback);
  },

  /**
   * @desc Link user's Google account
   * @param {String} access_token
   * @param {Object} profile
   * @param {Function} callback
   * @api public
   */
  setGoogle: function(access_token, profile, callback) {
    this.google.id = profile.id;
    this.google.token = access_token;
    this.google.email = profile.emails[0].value;
    this.google.profile = profile;
    this.save(callback);
  },

  /**
   * @desc Get user's Google+ profile photo
   * @return {String}
   * @api public
   */
  googlePhoto: function() {
    return this.google.profile.image.url.replace("sz=50", "sz=200");
  },

  /**
   * @desc Unlink user's Google account
   * @param {Function} callback
   * @api public
   */
  unlinkGoogle: function(callback) {
    this.google.id = undefined;
    this.google.token = undefined;
    this.google.profile = undefined;
    this.save(callback);
  },  

  /**
   * @desc Link user's Twitter account
   * @param {String} access_token
   * @param {Object} profile
   * @param {Function} callback
   * @api public
   */
  setTwitter: function(access_token, secret, profile, callback) {
    this.twitter.token = access_token;
    this.twitter.tokenSecret = secret;
    this.twitter.profile = profile;
    this.save(callback);
  },

  /**
   * @desc Get user's Twitter profile photo
   * @return {String}
   * @api public
   */
  twitterPhoto: function() {
    return this.twitter.profile.profile_image_url.replace("_normal", "");
  },

  /**
   * @desc Unlink user's Facebook account
   * @param {Function} callback
   * @api public
   */
  unlinkTwitter: function(callback) {
    this.twitter.token = undefined;
    this.twitter.profile = undefined;
    this.save(callback);
  },

  /**
   * @desc Link user's Twitter account
   * @param {String} access_token
   * @param {Object} profile
   * @param {Function} callback
   * @api public
   */
  setFoursquare: function(access_token, profile, callback) {
    this.foursquare.token = access_token;
    this.foursquare.profile = profile;
    this.save(callback);
  },

  /**
   * @desc Unlink user's Foursquare account
   * @param {Function} callback
   * @api public
   */
  unlinkFoursquare: function(callback) {
    this.foursquare.token = undefined;
    this.foursquare.profile = undefined;
    this.save(callback);
  },

  /**
   * @desc Link user's GitHub account
   * @param {String} access_token
   * @param {Object} profile
   * @param {Function} callback
   * @api public
   */
  setGithub: function(access_token, profile, callback) {
    this.github.token = access_token;
    this.github.profile = profile;
    this.github.email = profile.email;
    this.save(callback);
  },

  /**
   * @desc Unlink user's Github account
   * @param {Function} callback
   * @api public
   */
  unlinkGithub: function(callback) {
    this.github.token = undefined;
    this.github.profile = undefined;
    this.save(callback);
  },

  /**
   * Find out if user has any linked social networks
   * @return {Boolean}
   */
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
    return Sentinal.crypt.makeSalt();
  },

  /**
   * @desc Encrypt password
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    return Sentinal.crypt.encryptPassword(password, this);
  }

};

module.exports = mongoose.model('User', UserSchema);