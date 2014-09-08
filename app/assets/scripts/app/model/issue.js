define([
  "jquery",
  "underscore",
  "backbone"
],function($, _, Backbone) {

  var Issue = Backbone.Model.extend({

    tpl: _.template([
      "<li class='list-group-item'>",
        "<h4>",
          "<a href='<%= html_url %>'><%= title %></a>",
        "</h4>",
      "</li>"
    ].join("")),

    constructor: function(data, foo) {
      data.repo = data.repository.full_name;
      Backbone.Model.apply(this, [data, foo]);
    },

    render: function() {
      return this.tpl(this.attributes);
    }

  });

  return Issue;

});