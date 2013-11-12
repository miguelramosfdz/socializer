
var LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user');

module.exports = {

  //Serialize sessions
  serializeUser: function(user, done) {
    done(null, user.id);
  },

  // Deserialize sessions
  deserializeUser: function(id, done) {
    var user = User.findById(id);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
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
  localStrategy: new LocalStrategy(
    function ( username, password, done ) {
      User.isValidPassword(username, password, done);
    }
  )
}