define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      'github': 'github',
      'github/rate_limit': 'githubRateLimit',
 
      // Default - catch all
      '*actions': 'defaultAction'
    },

    github: function() {
      require(["app/views/github"], function(GithubPage) {
        GithubPage.render();
      });
    },

    githubRateLimit: function() {
      require(["app/views/github/rate_limit"], function(GithubPage) {
        GithubPage.render();
      });
    }

  });
 
  var initialize = function(options){
    var router = new AppRouter(options);
    Backbone.history.start();
  };
 
  return {
    initialize: initialize
  };
});