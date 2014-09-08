define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      'github/issues': 'githubIssues',
      'github/rate_limit': 'githubRateLimit',
 
      // Default - catch all
      '*actions': 'defaultAction'
    },

    githubIssues: function() {
      require(["app/views/github/issues"], function(GithubIssues) {
        GithubIssues.render();
      });
    },

    githubRateLimit: function() {
      require(["app/views/github/rate_limit"], function(GithubRateLimit) {
        GithubRateLimit.render();
      });
    }

  });
 
  var initialize = function(options){
    var router = new AppRouter(options);
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      root: "/"
    });
  };
 
  return {
    initialize: initialize
  };
});