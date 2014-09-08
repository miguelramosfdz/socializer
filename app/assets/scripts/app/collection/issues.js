define([
  "jquery",
  "underscore",
  "backbone",
  "app/model/issue"
],function($, _, Backbone, Issue) {

  var Issues = Backbone.Collection.extend({

    model: Issue,

    tpl: _.template([
      "<div class='panel panel-default>",
        "<div class='panel-heading'>",
          "<h3><%= name %></h3>",
        "</div>",
        "<ul class='list-group'>",
          "<% _.each(repos, function(repo) { %>",
            "<%= repo.render() %>",
          "<% }) %>",
        "</ul>",
      "</div>"
    ].join("")),

    renderIssues: function() {
      var self = this;
      var result = "";
      var repos = self.groupBy('repo');
      
      Object.keys(repos).forEach(function(repo) {
        result += self.tpl({
          name: repo,
          repos: repos[repo]
        });
      });

      return result;
    }

  });

  return new Issues();

});