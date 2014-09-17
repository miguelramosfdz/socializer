"use strict";

var Issues = require("../collection/issues");
var ReposView = require("./repos");
var IssueView = require("./issue");

var IssuesView = Backbone.View.extend({

  collection: Issues,

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
      var repos = self.collection.groupBy('repo');

      self.updateIssuesCount(issues.length);

      /**
       * Render issues grouped by repository
       */
      $("#github-issues").append(Object.keys(repos).map(function(repo) {
        return ReposView.template({
          name: repo,
          repos: repos[repo],
          tpl: IssueView.template
        });
      }).join(""));
    });
  }

});

module.exports = new IssuesView();