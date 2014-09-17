'use strict';

/**
 * Add Application Wide Controllers Here
 */
var AppController = function() {};

AppController.prototype.getTemplate = function(req, res) {
  res.render("templates/"+req.params.template);
};

AppController.prototype.getAbout = function(req, res) {
  res.render("static/about");
};

AppController.prototype.getCatchAll = function(req, res) {
  res.render("home", { user: req.user });
};

module.exports = new AppController();