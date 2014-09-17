(function() {
  "use strict";
  
  var MapView;
  var Map = require("./map");
  var CheckinView = require("./checkin");
  var API = require("../../service/api");
  var Checkins = require("../collection/checkins");
  
  var CheckinsView = Backbone.View.extend({
    
    el: "#content",

    collection: Checkins,

    events: {
      "mouseover .list-group-item": "onMouseover"
    },

    onMouseover: function(e) {
      var checkin_id, checkin, marker;
      checkin_id = e.currentTarget.dataset.id;

      /**
       * Close any open info windows
       */
      MapView.closeWindows(function() {
        /**
         * Open info window and center map
         */
        MapView.openWindow(checkin_id);
      });
    },

    render: function() {
      var self = this;
      MapView = new Map();
      
      $("#content").append("<div id='checkins'></div>");

      /**
       * Search Foursquare for user's checkins
       */
      API.getCheckins()
        .done(function(data) {
          $('#checkins').html('');
          var checkins = data.response.checkins.items;
          self.collection.add(checkins);

          _.each(self.collection.models, function(checkin) {
            var venue = checkin.get("venue");
            var view = new CheckinView({ model: checkin });
            MapView.createMarker({
              id: checkin.get("id"),
              location: venue.location,
              content: venue.name
            });
            $('#checkins').append(view.render());
          });
        })
        .fail(function(data) {
          console.log("Error:", data);
        });
    }

  });
  
  module.exports = new CheckinsView();

})();