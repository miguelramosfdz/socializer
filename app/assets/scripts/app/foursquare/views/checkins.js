(function() {
  "use strict";
  
  var CheckinView = require("./checkin");
  var API = require("../../service/api");
  var Checkins = require("../collection/checkins");
  
  var CheckinsView = Backbone.View.extend({
    
    el: "#content",

    tagName: 'div',

    id: 'checkins',

    collection: Checkins,

    events: {
      "mouseover .list-group-item": "onMouseover"
    },

    onMouseover: function(e) {
      var checkin_id, checkin, marker;
      var MapView = App.Foursquare.views.Map;
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
            App.Foursquare.views.Map.createMarker({
              id: checkin.get("id"),
              location: venue.location,
              content: venue.name
            });
            $('#checkins').append(view.render());
          });

          App.Foursquare.views.Map.fitToBounds();
        })
        .fail(function(data) {
          console.log("Error:", data);
        });
    }

  });
  
  module.exports = CheckinsView;

})();