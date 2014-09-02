module.exports = (function() {

  return {
    getSignUp: function(req, res, next) {
      res.render('users/sign_up');
    },
    getLogIn: function(req, res, next) {
      res.render('users/sign_in');
    }
  };

})();