"use strict";

window.$ = require("jquery");
window._ = require("underscore");
window.Backbone = require("backbone");
Backbone.$ = $;

var Foursquare = require("./foursquare/routes");
var Github = require("./github/app");

var AppRouter = Backbone.Router.extend({
  
  routes: {
    "foursquare": "foursquare",
    "github": "github",
    "github/issues": "githubIssues",
    "github/rate_limit": "githubRateLimit",

    // Default - catch all
    "*actions": "defaultAction"
  },

  foursquare: Foursquare.checkinsRoute,

  github: Github.initialize,
  
  githubIssues: Github.issues

});

module.exports = AppRouter;
