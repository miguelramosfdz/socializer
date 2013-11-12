var User = require('../models/user'),
    passport = require('passport');

module.exports = {

  sign_up: function ( req, res, next ) {
    var new_user = req.body.user;
    if ( new_user.password === new_user.password_confirmation ) {
      User.sign_up( new_user, function ( err, user ) {
        if (err) throw err;
        req.login(user, function (err) {
          if (err) throw err;
          return res.send(200, { message: 'User Signed Up' });
        })
      });
    }
  },

  sign_in: function (req, res, info) {
    passport.authenticate('local', function (err, user, info) {
      if (err) throw err;
      if (!user) return res.json(400, { message: 'Incorrect username and/or password.'});
      req.logIn(user, function (err) {
        if (err) throw err;
        return res.json({ message: 'Sign In Successful' });
      });
    })(req, res, info);
  },

  is_signed_in: function ( req, res, next ) {
    return res.send( req.isAuthenticated() ? req.user : '0' );
  },

  sign_out: function ( req, res, next ) {
    req.logOut();
    return res.json({ message: "You've been logged out." });
  }

};