"use strict";

var IssueView = Backbone.View.extend({

  tagName: 'li',

  className: 'list-group-item',

  template: _.template( 
    "<h4>"+
      "<a data-id='<%= id %>' data-toggle='modal' data-target='#basicModal'>"+
          "<%= title %>"+
      "</a>"+
    "</h4>"
  ),

  events: {
    'click .list-group-item': 'onIssueClick'
  },

  onIssueClick: function() {
    
  },

  render: function() {
    
  }

});

module.exports = new IssueView();
