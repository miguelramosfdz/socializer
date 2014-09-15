define([
  "api",
  "app/collection/github/issues"
], function(API, Issues) {
  
  var IssuesView = Backbone.View.extend({

    el: '#content',

    collection: Issues,

    template: _.template([
      "<div class='row'>",
        "<div class='page-header'>",
          "<h1>Issues     <small id='issues-count'></small></h1>",
        "</div>",
        "<div class='col-md-offset-1 col-md-10'>",
          "<ul class='list-group' id='github-issues'></ul>",
        "</div>",
      "</div>"
    ].join("")),

    repoTemplate: _.template([
      "<div class='panel panel-default>",
        "<div class='panel-heading'>",
          "<h3><%= name %></h3>",
        "</div>",
        "<ul class='list-group'>",
          "<% _.each(repos, function(repo) { %>",
            "<%= tpl(repo.attributes) %>",
          "<% }) %>",
        "</ul>",
      "</div>"
    ].join("")),

    issueTemplate: _.template([
      "<li class='list-group-item'>", 
        "<h4>",
          "<a id='<%= id %>'><%= title %></a>",
        "</h4>",
      "</li>"
    ].join("")),

    /**
     * Show total amount of issues
     */
    updateIssuesCount: function(count) {
      $("#issues-count").html("     Amount:   "+count);
    },

    render: function() {
      var self = this;

      this.$el.append(this.template());

      self.collection.load(function(issues) {
        var repos = self.collection.groupBy('repo');

        self.updateIssuesCount(issues.length);

        /**
         * Render issues grouped by repository
         */
        $("#github-issues").html(Object.keys(repos).map(function(repo) {
          return self.repoTemplate({
            name: repo,
            repos: repos[repo],
            tpl: self.issueTemplate
          });
        }).join(""));
      });
    }

  });

  return new IssuesView();
});