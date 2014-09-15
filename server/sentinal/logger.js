/**
 * Module to hold logIn and logOut
 * @type {Object}
 */
var logger = {};
var _ = require("lodash");

logger.isAuthenticated = function() {
  return !!this.user;
};

/**
 * Log in user
 * The scope inside of this function will be that of req.
 * 
 * @param  {User} user
 * @param  {Object} options
 */
logger.logIn = function(user) {
  this.session.user = user.id;
};

logger.serialize_user = function(callback) {
  if (req.session && req.session.user) {
    callback(req.session.user, logger.serialize_done);
  } else {
    next();
  }
};

logger.serialize_done = function(err, userProperty) {
  this.session.user = user.id;
  next();
};

logger.deserialize_user = function(callback) {
  return function(req, res, next) {
    if (req.session && req.session.user) {
      callback(req.session.user, logger.deserialize_done.bind({ 
        req: req,
        next: next
      }));
    } else {
      next();
    }
  };
};

logger.deserialize_done = function(err, user) {
  this.req.user = user;
  this.next();
};

/**
 * Log out user
 * 
 * The scope inside of this function will be that of req.
 * 
 * @param  {User} user
 * @param  {Object} options
 */
logger.logOut = function() {
  delete this.session.user;
};

module.exports = logger;
