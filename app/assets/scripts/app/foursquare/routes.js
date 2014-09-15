module.exports = (function() {

  return {
    
    checkinsRoute: function() {
      var CheckinsView = require("./views/checkins");
      CheckinsView.render();
    }

  };

})();