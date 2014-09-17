
module.exports = (function() {

  var MapView = Backbone.View.extend({

    template: _.template("<div id='map'></div>"),

    initialize: function() {
      this.render();
      this.map = new google.maps.Map($("#map")[0], {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
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