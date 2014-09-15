/**
 * `Sentinal` constructor
 */
var Sentinal = function() {
  this.strategies = {
    Facebook: require('./strategies/facebook'),
    Google:  require('./strategies/google'),
    Github:  require('./strategies/github'),
    Foursquare:  require('./strategies/foursquare'),
    Twitter:  require('./strategies/twitter')
  };
  
  this.logger = require("./logger");
  
  this.crypt = require("./crypt");
};



Sentinal.prototype.authenticate = function(options, callback) {
  return function(req, res ,next) {
    callback(function(err) {
      if (err) 
        res.redirect(options.failureRedirect);

      res.redirect(options.successRedirect);
    });

    App.User.findOne({ email: email }).exec(function(err, user) {
      if (err) 
        throw Error(err);

      if (!user)
        fn(new Error("Can not locate user"));

      this.crypt.hash(email, password, function(err, hash) {
        if (err) return callback(err);
        if (hash.toString() == user.hashed_password) return callback(null, user);
        callback(new Error("Invalid password"));
      });
    });
  };
};

/**
 * Route middleware to set headers
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
Sentinal.prototype.cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

/**
 * Route middleware to ensure that a user is logged in
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Boolean}
 */
Sentinal.prototype.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

/**
 * Route middleware to ensure that a user is not logged in
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {Boolean}
 */
Sentinal.prototype.isNotLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/');
  next();
};

Sentinal.prototype.initialize = function() {
  var self = this;

  return function(req, res, next) {
    req.isAuthenticated = self.logger.isAuthenticated;
    req.login = self.logger.logIn;
    req.logout = self.logger.logOut;
    next();
  };
};

module.exports = new Sentinal();
