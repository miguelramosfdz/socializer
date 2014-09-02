module.exports = (function() {

  var async = require('async');

  return {
    getSignUp: function(req, res, next) {
      res.render('users/sign_up');
    },
    getLogIn: function(req, res, next) {
      res.render('users/sign_in');
    },
    getAccount: function(req, res, next) {
      res.render('users/account');
    },
    resetPassword: function(req, res, next) {
      var validPassword = req.user.validPassword(req.body.current_password);
      var match = req.body.password == req.body.password_confirmation;

      async.waterfall([
        function(done) {
           if (!validPassword) {
            req.flash('error', 'You did not enter a valid password');
            done();
          } else if (!match) {
            req.flash('error', 'The passwords you entered did not match');
            done();
          } else {
            req.user.set('password', req.body.password);
            req.user.save(function(err) {
              if (err) {
                req.flash('error', err);
              } else {
                req.flash('success', 'Your password has been changed.');  
              }
              done();
            });
          }
        }
      ], 
      function(err) {
        if (err) return next(err);
        res.redirect('/account');
      });
    }
  };

})();