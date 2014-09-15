module.exports = (function() {

  var ApiController = function() {};

  ApiController.prototype.getMe = function(req, res, next) {
    if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json({ message: "No user signed in." });
    }
  };

  return new ApiController();

})();