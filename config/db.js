
module.exports = function() {

	require("mongoose").connect('mongodb://localhost/boiler',
		function ( err, result ) {
	    if (err) {
	      console.log('Could not connect to MongoDB');
	    } else {
	      console.log('Connected to MongoDB...');
	    }
  	}
  );

}
