"use strict";

var IssueView = Backbone.View.extend({

  template: _.template(
    "<li class='list-group-item'>"+
      "<h4>"+
        "<a id='<%= id %>'><%= title %></a>"+
      "</h4>"+
    "</li>"
  ),

  render: function() {

  }

});

module.exports = new IssueView();