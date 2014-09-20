"use strict";

var Repo = require("../model/repo");

var Repos = Backbone.Collection.extend({

  model: Repo,
  
  url: "/api/github/repos"
    
});

module.exports = new Repos();
