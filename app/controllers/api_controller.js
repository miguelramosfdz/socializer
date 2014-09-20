"use strict";

var _ = require("underscore");
var ApiController = function() {};

ApiController.prototype.getMe = function(req, res) {
  if (req.isAuthenticated()) {
    var u = _.omit(req.user.toJSON(), "hashed_password", "salt");
    res.status(200).json(u);
  } else {
    res.status(401).json({ message: "No user signed in." });
  }
};

module.exports = new ApiController();

