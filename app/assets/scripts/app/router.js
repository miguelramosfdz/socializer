window.$ = require("jquery");
window._ = require("underscore");
window.Backbone = require("backbone");
Backbone.$ = $;

var Foursquare = require("./foursquare/routes");
var Github = require("./github/app");

var AppRouter = Backbone.Router.extend({
  
  routes: {
    "foursquare": "foursquare",
    "github/issues": "githubIssues",
    "github/rate_limit": "githubRateLimit",

    // Default - catch all
    "*actions": "defaultAction"
  },

  foursquare: Foursquare.checkinsRoute,

  githubIssues: Github.issues,

  githubRateLimit: function() {
    require(["app/views/github/rate_limit"], function(GithubRateLimit) {
      GithubRateLimit.render();
    });
  }

});

var initialize = function(){
  var router = new AppRouter();
  Backbone.history.start({
    pushState: true
  });
};

module.exports = {
  initialize: initialize
};