
var LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user');

module.exports = {

  //Serialize sessions
  serializeUser: function(user, done) {
    var createAccessToken = function () {
      var token = user.generateRandomToken();
      User.findOne( { accessToken: token }, function (err, existingUser) {
        if (err) { return done( err ); }
        if (existingUser) {
          createAccessToken(); // Run the function again - the token has to be unique!
        } else {
          user.set('accessToken', token);
          user.save( function (err) {
            if (err) return done(err);
            return done(null, user.get('accessToken'));
          })
        }
      });
    }

    if ( user._id ) {
      createAccessToken();
    }
  },

  // Deserialize sessions
  deserializeUser: function(token, done) {
    User.findOne( {accessToken: token } , function (err, user) {
      done(err, user);
    });
  },

  // Create CSRF token
  csrf: function(req) {
    var token = (req.body && req.body._csrf)
                || (req.query && req.query._csrf)
                || (req.headers['x-csrf-token'])
                || (req.headers['x-xsrf-token']);
    return token;
  },

  //Use local strategy
  localStrategy: new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      user.isValidPassword(password, function (err, isMatch) {
        if (err) return done(err);
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  })

}