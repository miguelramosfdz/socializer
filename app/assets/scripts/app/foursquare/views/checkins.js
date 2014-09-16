(function() {
  "use strict";
  
  var Map = require("./map");
  var CheckinView = require("./checkin");
  var API = require("../../service/api");
  var Checkins = require("../collection/checkins");
  
  var CheckinsView = Backbone.View.extend({
    
    el: "#content",

    collection: Checkins,

    render: function() {
      var self = this;
      var MapView = new Map();
      
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
            var location = venue.location;
            var latLng = new google.maps.LatLng(location.lat, location.lng);
            var marker = new google.maps.Marker({
                position: latLng,
                title: venue.name
            });
            marker.setMap(MapView.map);
            MapView.map.setCenter(marker.getPosition());
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