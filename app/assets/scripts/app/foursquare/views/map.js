module.exports = (function() {
  "use strict";

  var MapView = Backbone.View.extend({

    markers: {},

    createMarker: function(options) {
      var self = this;
      var location = options.location;
      var latLng = new google.maps.LatLng(location.lat, location.lng);
      var marker = new google.maps.Marker({
          map: self.map,
          position: latLng,
          title: options.content,
          info: new google.maps.InfoWindow({
            content: options.content
          })
      });
      
      google.maps.event.addListener(marker, 'click', function() {
        marker.getMap().setZoom(19);
        marker.getMap().panTo(marker.getPosition());
        marker.info.open(marker.getMap(), marker);
      });
        
      self.markers[options.id] = marker;

      return self;
    },

    fitToBounds: function() {
      var self = this;
      var bounds = new google.maps.LatLngBounds();
      
      Object.keys(self.markers).forEach(function(m) {
        var marker = self.markers[m];
        bounds.extend(marker.getPosition());
      });

      self.map.fitBounds(bounds);

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
      google.maps.event.trigger(marker, 'click');
      return this;
    },

    render: function() {
      this.map = new google.maps.Map($("#map")[0], {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 6
      });
      return this;
    }

  });

  return MapView;

})();