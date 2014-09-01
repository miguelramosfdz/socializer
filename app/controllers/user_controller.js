module.exports = (function() {
  "use strict";

  return {
      getLogin: function(req, res, next) {

      },
      
      postLogin: function(req, res, next) {

      },
      logout: function(req, res, next) {

      },
      getForgot: function(req, res, next) {

      },
      postForgot: function(req, res, next) {

      },
      getReset: function(req, res, next) {

      },
      postReset: function(req, res, next) {

      },
      getSignup: function(req, res, next) {
        res.render('user/sign_up');
      },
      postSignup: function(req, res, next) {

      },
      getAccount: function(req, res, next) {

      },
      postUpdateProfile: function(req, res, next) {

      },
      postUpdatePassword: function(req, res, next) {

      },
      postDeleteAccount: function(req, res, next) {

      },
      getOauthUnlink: function(req, res, next) {

      }
  };

})();