"use strict";

var Issue = require("../model/issue");

var Issues = Backbone.Collection.extend({

  model: Issue,

  load: function(callback) {
    var self = this;
    
    App.API.getGithubIssues(null, function(issues) {
      _.each(issues, function(issue) {
        self.add(issue);
      });
      if (callback) {
        callback(self.models);
      }
    });
  }

});

module.exports = new Issues();