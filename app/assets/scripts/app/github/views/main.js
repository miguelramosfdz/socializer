"use strict";

var MainView = Backbone.View.extend({

  viewId: 'githubMainView',

  template: _.template(
    "<div class='row github' id='githubView'>"+
      "<div class='col-sm-5' id='repos'></div>"+
      "<div class='col-sm-7' id='issues'></div>"+
    "</div>"
  ),

  initialize: function() {
    App.resetAppView(this.template());
    var IssuesView = require("./issues");
    IssuesView.render();
  }

});

module.exports = new MainView();
