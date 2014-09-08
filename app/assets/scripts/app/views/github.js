define([
  "jquery",
  "underscore",
  "backbone",
  "api",
  "app/collection/issues"
], function($, _, Backbone, API, Issues) {
  
  var GithubView = Backbone.View.extend({

    el: '#content',

    collection: Issues,

    render: function() {
      var self = this;

      API.getView("github", function(html) {
        self.$el.html(html);
      });

      API.getGithubIssues(null, function(issues) {
        _.each(issues, function(issue) {
          self.collection.add(issue);
        });
        
        /**
         * Show total amount of issues
         */
        $("#issues-count").html("     Amount:   "+issues.length);

        /**
         * Render issues grouped by repository
         */
        $("#github-issues").html(self.collection.renderIssues());
      });
    }

  });

  return new GithubView();
});