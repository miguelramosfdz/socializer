define([
  "jquery",
  "underscore",
  "backbone",
  "api",
  "app/collection/issues"
], function($, _, Backbone, API, Issues) {

  var RateLimit = Backbone.View.extend({

    el: "#content",

    render: function() {
      var self = this;
      API.getView("github/rate_limit", function(html) {
        self.$el.html(html);
      });
    }

  });


  return new RateLimit();

});