"use strict";

var ReposView = require("./repos");
var IssuesView = require("./issues");

var MainView = Backbone.View.extend({

  viewId: 'githubMainView',

  template: _.template(
    "<div class='row github' id='githubView'>"+
      "<div class='col-sm-offset-2 col-sm-8'>"+
        '<div class="panel panel-default">'+
          '<div class="panel-heading">'+
            '<h2>Repos</h2>'+
          '</div>'+
          '<div id="repos"></div>'+
        '</div>'+
      "</div>"+
    "</div>"
  ),

  initialize: function() {
    App.resetAppView(this.template());
    
    ReposView.render();

    // IssuesView.render();
  }

});

module.exports = new MainView();
