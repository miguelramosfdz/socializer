define([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {

  var IssueView = Backbone.View.extend({

    tagName: "li",

    className: "list-group-item issue",

    events: {
      "click h4 a": "clickIssue"
    },

    clickIssue: function() {
      debugger;
    },

    template: _.template([
      "<h4>",
        "<a id='<%= id %>'><%= title %></a>",
      "</h4>"
    ].join("")),

    render: function(issue) {
      return $(this.el).html(this.template(issue.attributes))[0].outerHTML;
    }

  });

  return new IssueView();

});