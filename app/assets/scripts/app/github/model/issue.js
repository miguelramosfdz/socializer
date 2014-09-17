"use strict";

var Issue = Backbone.Model.extend({

  constructor: function(data, foo) {
    data.repo = data.repository.full_name;
    Backbone.Model.apply(this, [data, foo]);
  }

});

module.exports = Issue;