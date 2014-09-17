var App = Backbone.Model.extend({

  collections: {},

  views: {},

  models: {},

  currentView: null,
  
  Router: require("./router")

});

module.exports = App;