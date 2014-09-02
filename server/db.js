exports.setup = function(mongoose) {
	'use strict';

  var mongoose = require('mongoose');
  var Hedgehog = require('../.hedgehog.js');
  var db = Hedgehog.db[process.env.NODE_ENV];

	mongoose.connect(db, function(err) {
		if (err) {
      console.log(err);
    } else {
      console.log('Connected to MongoDB');
    } 
	});

};