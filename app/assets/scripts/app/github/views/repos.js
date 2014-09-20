"use strict";

var ReposView = Backbone.View.extend({

  tagName: "ul",

  className: "list-group",

  template: _.template(
    '<% _.each(repos, function(repo) { %>'+
      '<li class="list-group-item">'+
        '<h4><%= repo.get("name") %></h4>'+
      '</li>'+
    '<% }) %>'
  ),

  collection: App.Github.collection.Repos,

  render: function() {
    var self = this;
    this.listenTo(this.collection, "change reset add remove", function() {
      $("#repos").html(this.$el.html(self.template({
        repos: App.Github.collection.Repos.models 
      })));
    });
  }

});

module.exports = new ReposView();
