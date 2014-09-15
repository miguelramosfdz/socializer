// check out https://github.com/visionmedia/node-pwd

var crypto = require('crypto');

/**
 * Bytesize.
 */
var len = 128;

/**
 * Iterations. ~300ms
 */
var iterations = 12000;

var sentinal = {};

/**
 * @desc Make salt
 * @return {String}
 * @api public
 */
sentinal.makeSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

/**
 * @desc Encrypt password
 * @param {String} password
 * @return {String}
 * @api public
 */
sentinal.encryptPassword = function(password, user) {
  var salt;
  /**
   * If user is passed in, encrypt password based on user's salt
   */
  if (user && user.salt) {
    if (user.salt) {
      salt = new Buffer(user.salt, 'base64');  
      return crypto.pbkdf2Sync(password, salt, iterations, len).toString('base64');
    } else {
      return '';
    }
  } else if (password) {
    salt = sentinal.makeSalt();
    return crypto.pbkdf2Sync(password, salt, iterations, len).toString('base64');
  } else {
    return '';
  }
};

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */
sentinal.hash = function(pwd, salt, callback) {
  if (salt) {
    crypto.pbkdf2(pwd, salt, iterations, len, callback);
  } else {
    salt = sentinal.makeSalt();
    crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash) {
      if (err) return fn(err);
      callback(null, salt, hash);
    });
  }
};

module.exports = sentinal;