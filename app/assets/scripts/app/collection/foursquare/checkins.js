define([
  "jquery",
  "underscore",
  "backbone",
  "app/model/foursquare/checkin"
], function($, _, Backbone, Checkin) {

  var CheckinsCollection = Backbone.Collection.extend({

    model: Checkin

  });

  return CheckinsCollection;
  
});