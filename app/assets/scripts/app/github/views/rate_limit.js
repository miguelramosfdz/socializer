"use strict";

var RateLimit = Backbone.View.extend({

  el: "#content",

  render: function() {
    var self = this;
    App.API.getView("github/rate_limit", function(html) {
      self.$el.html(html);
    });
  }

});


module.exports = new RateLimit();
