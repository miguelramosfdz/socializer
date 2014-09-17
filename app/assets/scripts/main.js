window.$ = require("jquery");
window._ = require("underscore");
window.Backbone = require("backbone");
Backbone.$ = $;

/**
 * Require and initialize App
 */
var AppModel = require("./app/app");
window.App = new AppModel();

/**
 * Initialize App.Router
 */
App.Router.initialize();