var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: { type: String, limit: 20, required: true, unique: true, trim: true },
  password: { type: String, limit: 20, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  signedUp: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now }
});

UserSchema.statics.sign_up = function ( new_user, done ) {
  // hash & salt password and create User
  bcrypt.hash( new_user.password, 10, function(err, hash) {
    User.create({
      username: new_user.username,
      email: new_user.email,
      password: hash
    }, function (err, user) {
      if (err) {
        console.log(err)
        throw err;
      }
      done(null,user);
    })
  });

}

UserSchema.statics.isValidPassword = function ( username, password, done ) {
  this.findOne({username: username}, function ( err, user ) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username' });
    bcrypt.compare(password, user.password, function ( err, result ) {
      if (err) return done(err);
      if (!result) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user, { message: 'signup successful'});
    });
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = User;