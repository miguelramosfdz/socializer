define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      'github': 'github',
 
      // Default - catch all
      '*actions': 'defaultAction'
    },

    github: function() {
      require(["app/views/github"], function(GithubPage) {
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