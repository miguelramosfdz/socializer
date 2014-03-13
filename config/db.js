
exports.setup = function(mongoose) {
	mongoose.connect('mongodb://localhost/boiler', function(err) {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log('Connected to MongoDB');
		}
	});
}