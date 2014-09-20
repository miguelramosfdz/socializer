"use strict";

var Repos = require("../collection/repos");

var ReposView = Backbone.View.extend({

  collection: Repos,

});

return new ReposView();
