var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: { type: String, limit: 20, required: true, unique: true, trim: true },
  password: { type: String, limit: 20, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  signedUp: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.isValidPassword = function ( username, password, done ) {
  User.findOne({ username: username }, function ( err, user ) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username' });
    bcrypt.compare(password, user.password, function ( err, result ) {
      if (err) return done(err);
      if (!result) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user, { message: 'signup successful'});
    });
  });
};

UserSchema.methods.generateRandomToken = function () {
  var user = this,
      chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;