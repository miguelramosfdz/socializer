"use strict";

module.exports = {

  initialize: function() {
    App.Github = {
      collection: {},
      model: {},
      view: {}
    };
    
    /**
     * Set app collections
     * @type {Backbone.Collection}
     */
    App.Github.collection.Repos = require('./collection/repos');
    App.Github.collection.Issues = require("./collection/issues");
    
    /**
     * Fetch current user's repos
     */
    App.Github.collection.Repos.fetch();

    /**
     * Render main view of Github application
     */
    var MainView = require("./views/main");
    MainView.render();

    /**
     * Set currentView of App to github
     */
    App.setCurrentView(MainView);
  },

  issues: function() {

  }

};
