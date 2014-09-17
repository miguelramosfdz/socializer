"use strict";

module.exports = {

  issues: function() {
    var MainView = require("./views/main");
    MainView.render();
    App.setCurrentView(MainView);
  }

};