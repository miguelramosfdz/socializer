"use strict";

var MainView = require("./views/main");

module.exports = {

  initialize: function() {
    App.Github = {
      collection: {},
      model: {},
      view: {}
    };
    
    App.Github.collection.Repos = require('./collection/repos');
    App.Github.collection = require("./collection/issues");
    
    /**
     * Fetch current user's repos
     */
    App.Github.collection.Repos.fetch();

    /**
     * Render main view of Github application
     */
    MainView.render();

    /**
     * Set currentView of App to github
     */
    App.setCurrentView(MainView);
  },

  issues: function() {

  }

};
