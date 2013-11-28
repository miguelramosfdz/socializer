var User = require('../models/user'),
    passport = require('passport'),
    bcrypt = require('bcrypt');

module.exports = {

  signup: function ( req, res, next ) {
    var new_user = req.body.user;
    if ( new_user.password === new_user.password_confirmation ) {
      bcrypt.hash( new_user.password, 10, function ( err, hash ) {
        if ( err ) return res.json({ error: err });
        User.create({
          username: new_user.username,
          email: new_user.email,
          password: hash
        }, function ( err, user ) {
          if (err) return res.json(400, { message: 'User could not be signed up:'+err })
          return res.json({ message: 'User Signed Up.' });
        });
      });
    }
  },

  signin: function (req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.session.messages =  [info.message];
          return res.redirect('/login')
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })(req, res, next);
  },

  is_signed_in: function ( req, res, next ) {
    return res.send( req.isAuthenticated() ? req.user : '0' );
  },

  signout: function ( req, res, next ) {
    req.logOut();
    return res.json({ message: "You've been logged out." });
  }

};