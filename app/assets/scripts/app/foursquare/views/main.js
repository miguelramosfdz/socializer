module.exports = (function() {

  var MapView = require("./map");
  var CheckinsView = require("./checkins");

  var MainView = Backbone.View.extend({

    template: _.template(
      "<div class='row foursquare'>"+
        "<div class='col-sm-5' id='map'></div>"+
        "<div class='col-sm-7' id='checkins'></div>"+
      "</div>"
    ),

    initialize: function() {
      App.Foursquare = {
        collections: {},
        models: {},
        views: {}
      };
      App.Foursquare.views.Map = new MapView({ parent: this });
      App.Foursquare.views.Checkins = new CheckinsView({ parent: this });
    },

    render: function() {
      $("#content").html("");
      $("#content").html(this.template());
      App.Foursquare.views.Map.render();
      App.Foursquare.views.Checkins.render();
      return this;
    }

  });

  return new MainView();

})();