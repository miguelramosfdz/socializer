"use strict";

var ReposView = Backbone.View.extend({

  tagName: "ul",

  className: "list-group",

  template: _.template(
    '<li class="list-group-item">'+
      '<%= name %>'+
    '</li>'
  ),

  collection: App.Github.collection.Repos,

  initialize: function() {

  },

  render: function() {

  }

});

module.exports = new ReposView();
