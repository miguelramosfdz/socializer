"use strict";

module.exports = {
    
  checkinsRoute: function() {
    var MainView = require("./views/main");
    MainView.render();
    App.setCurrentView(MainView);
  }

};