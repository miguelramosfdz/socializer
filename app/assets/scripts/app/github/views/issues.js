"use strict";

var IssuesView = Backbone.View.extend({

  collection: App.Github.collection.Issues,

  template: _.template(
    "<div class='row'>"+
      "<div class='page-header'>"+
        "<h1>Issues     <small id='issues-count'></small></h1>"+
      "</div>"+
      "<div class='col-md-12' id='github-issues'></div>"+
    "</div>"
  ),

  /**
   * Show total amount of issues
   */
  updateIssuesCount: function(count) {
    $("#issues-count").html("     Amount:   "+count);
  },

  render: function() {
    var self = this;

    $('#githubView #issues').html(this.template());

    self.collection.load(function(issues) {
      self.updateIssuesCount(issues.length);
    });
  }

});

module.exports = new IssuesView();
