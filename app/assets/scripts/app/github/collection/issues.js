define([
  "api",
  "jquery",
  "underscore",
  "backbone",
  "app/model/github/issue"
],function(API, $, _, Backbone, Issue) {

  var Issues = Backbone.Collection.extend({

    model: Issue,

    load: function(callback) {
      var self = this;
      
      API.getGithubIssues(null, function(issues) {
        _.each(issues, function(issue) {
          self.add(issue);
        });
        if (callback) {
          callback(self.models);
        }
      });
    }

  });

  return new Issues();

});