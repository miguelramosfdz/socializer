module.exports = (function() {

  return {
    getSignUp: function(req, res, next) {
      res.render('users/sign_up');
    }
  };

})();