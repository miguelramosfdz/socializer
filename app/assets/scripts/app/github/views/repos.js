"use strict";

var Repos = require("../collection/repos");

var ReposView = Backbone.View.extend({
  
  collection: Repos,

  template: _.template(
    "<div class='panel panel-default>"+
      "<div class='panel-heading'>"+
        "<h3><%= name %></h3>"+
      "</div>"+
      "<ul class='list-group'>"+
        "<% _.each(repos, function(repo) { %>"+
          "<%= tpl(repo.attributes) %>"+
        "<% }) %>"+
      "</ul>"+
    "</div>"
  ),

  initialize: function() {
    this.collection.on('add', this.render);
  },

  render: function() {
    this.template({ repos: this.collection.models });
  }

});

module.exports = new ReposView();