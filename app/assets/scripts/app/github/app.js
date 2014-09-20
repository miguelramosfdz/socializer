"use strict";

module.exports = {

  initialize: function() {
    App.Github = {
      store: {},
      model: {},
      view: {}
    };
    
    App.Github.store.Repos = require('./collection/repos');
    App.Github.store.Repos.load();
  },

  issues: function() {
    var MainView = require("./views/main");
    MainView.render();
    App.setCurrentView(MainView);
  }

};
