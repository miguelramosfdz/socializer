exports.setup = function(mongoose) {
	'use strict';

  var Hedgehog = require('../.hedgehog.js');

	mongoose.connect(Hedgehog.db[process.env.NODE_ENV], function(err) {
		if (err) {
      console.log(err);
    } else {
      console.log('Connected to MongoDB');
    } 
	});

};