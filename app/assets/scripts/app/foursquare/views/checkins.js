(function() {
  "use strict";

  var Checkins = require("../collection/checkins");
  var API = require("../../service/api");

  var CheckinsView = Backbone.View.extend({
    
    el: "#content",

    collection: Checkins,

    template: _.template([
        "<li class='list-group-item'>",
          "<div class='row'>",
            "<div class='col-md-offset-3 col-md-6'>",
              "<%= venue.name %> in <%= venue.location.city %>, <%= venue.location.country %>",
            "</div>",
          "</div>",
        "</li>"
      ].join('')),

    mapEl: document.getElementById("checkins-map"),

    initializeMap: function() {
      this.map = new google.maps.Map(this.mapEl, {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
      });
    },

    render: function() {
      var self = this;

      /**
       * Initialize map
       */
      this.initializeMap();

      /**
       * Search Foursquare for user's checkins
       */
      API.getCheckins(function(data) {
        $('#checkins').html('');

        data.response.checkins.items.forEach(function(checkin) {
          self.collection.add(checkin);
          var location = checkin.venue.location;
          var latLng = new google.maps.LatLng(location.lat, location.lng);
          var marker = new google.maps.Marker({
              position: latLng,
              title: checkin.venue.name
          });
          marker.setMap($scope.map);
          $scope.map.setCenter(marker.getPosition());
          $('#checkins').append($scope.template(checkin));
        });
      });
    }

  });
  
  module.exports = new CheckinsView();

})();