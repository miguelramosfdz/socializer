var Checkin = require("../model/checkin");

var CheckinsCollection = Backbone.Collection.extend({

  model: Checkin

});

module.exports = CheckinsCollection;