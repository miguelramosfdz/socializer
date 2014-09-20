"use strict";

var RepoIssuesView = Backbone.View.extend({
  
  collection: App.Github.collection.Repos,

  template: _.template(
    "<div class='panel panel-default>"+
      "<div class='panel-heading'>"+
        "<h3><%= name %></h3>"+
      "</div>"+
      "<ul class='list-group'>"+
        "<% _.each(issues, function(issue) { %>"+
          "<%= issue.render() %>"+
        "<% }) %>"+
      "</ul>"+
    "</div>"
  ),

  initialize: function() {
    this.collection.on('add', this.render);
  },

  render: function() {
    this.template({ 
      repos: this.collection.models
    });
  }

});

module.exports = new RepoIssuesView();
