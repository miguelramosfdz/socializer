"use strict";

var App = Backbone.Model.extend({

  collections: {},

  views: {},

  models: {},

  currentView: null,

  API: require("./service/api"),

  resetAppView: function(html) {
    $("#content").html(html);
  },

  setCurrentView: function(view) {
    if (this.currentView) {
      console.log('Destroy view:'+view.viewId);
      var currentView = this.currentView;
      currentView.collection.unbind();
      currentView.remove();
      currentView.unbind();
    }
    console.log('Setting currentView to: '+view.viewId);
    this.currentView = view;
  },

  start: function() {
    var AppRouter = require("./router");

    this.Router = new AppRouter();

    Backbone.history.start({
      pushState: true
    });

    $(window.document).on("click", "a[href]:not([data-bypass])", function(e) {
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        var root = window.location.protocol+"//"+ window.location.host + '/';

        if (href.prop.slice(0, root.length) === root) {
          e.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
    });
  }

});

module.exports = App;
