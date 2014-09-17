module.exports = (function() {

  return {
    
    checkinsRoute: function() {
      var MainView = require("./views/main");
      MainView.render();
      App.currentView = MainView;
    }

  };

})();