
module.exports = (function() {

  var MapView = Backbone.View.extend({

    template: _.template("<div id='map'></div>"),

    markers: {},

    createMarker: function(options) {
      var self = this;
      var location = options.location;
      var latLng = new google.maps.LatLng(location.lat, location.lng);
      var marker = new google.maps.Marker({
          map: map,
          position: latLng,
          title: options.name
      });
      marker.setMap(self.map);
      marker.info = new google.maps.InfoWindow({
        content: options.name
      });
      google.maps.event.addListener(marker, 'click', function() {
        marker.getMap().setZoom(19);
        marker.getMap().panTo(marker.getPosition());
        marker.info.open(marker.getMap(), marker);
      });
      self.map.setCenter(marker.getPosition());
      self.markers[options.id] = marker;
      return self;
    },

    closeWindows: function(callback) {
      var self = this;
      var markerKeys = Object.keys(this.markers);

      _.each(markerKeys, function(key) {
        self.markers[key].info.close();
      });

      if (callback) {
        callback();  
      }
      
      return self;
    },

    openWindow: function(id) {
      var marker = this.markers[id];

      return this;
    },

    initialize: function() {
      this.render();
      this.map = new google.maps.Map($("#map")[0], {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 6
      });
      return this;
    },

    render: function() {
      $("#content").append(this.template());
      return this;
    }

  });

  return MapView;

})();