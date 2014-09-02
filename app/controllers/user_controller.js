module.exports = (function() {

  return {
    getSignUp: function(req, res, next) {
      res.render('user/sign_up');
    }
  };

})();