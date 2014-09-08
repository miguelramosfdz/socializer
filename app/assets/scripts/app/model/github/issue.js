define([
  "jquery",
  "underscore",
  "backbone",
  "app/views/github/issue"
],function($, _, Backbone, IssueView) {

  var Issue = Backbone.Model.extend({

    view: IssueView,

    constructor: function(data, foo) {
      data.repo = data.repository.full_name;
      Backbone.Model.apply(this, [data, foo]);
    },

    render: function() {
      return this.view.render(this);
    }

  });

  return Issue;

});