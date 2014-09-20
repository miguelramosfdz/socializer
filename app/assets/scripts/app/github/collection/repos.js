"use strict";

var Repo = require("../model/repo");

var Repos = Backbone.Collection.extend({

  model: Repo
  
});

module.exports = new Repos();
