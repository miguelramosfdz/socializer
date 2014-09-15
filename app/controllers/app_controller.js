exports = module.exports = (function() {
	'use strict';

	/**
	 * Add Application Wide Controllers Here
	 */
  var AppController = function() {};

  AppController.prototype.getPartial = function(req, res, next) {
    res.render("partials/"+req.params.type+"/"+req.params.file);
  };

  AppController.prototype.getAbout = function(req, res, next) {
    res.render("static/about");
  };

  AppController.prototype.getCatchAll = function(req, res, next) {
    res.render("home", { user: req.user });
  };

  return new AppController();

})();