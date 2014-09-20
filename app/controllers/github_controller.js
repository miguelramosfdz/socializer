"use strict";

module.exports = {

  getIssues: function(req, res) {
    if (process.env.NODE_ENV !== 'development') {
      req.user.GithubApi().get("issues", function(data) {
        res.json(data);
      }, true);
    } else {
      var json = require('./fixtures/github_issues');
      res.status(200).json(json);
    }
  },

  getIssue: function(req, res) {
    req.user.GithubApi().get(req.body.url, function(data) {
      res.status(200).json(data);
    }, false);
  },

  getRepos: function(req, res) {
    req.user.GithubApi().get("/user/repos", function(data) {
      res.status(200).json(data);
    }, false);
  },

  getRateLimit: function(req, res) {
    req.user.GithubApi().get("rate_limit", function(data) {
      res.render("social/github/rate_limit", { 
        data: data.resources
      });
    }, true);
  }

};
