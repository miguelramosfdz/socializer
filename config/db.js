
exports.setup = function(mongoose) {
	mongoose.connect('mongodb://localhost:27020/mydb', function(err) {
		if (err) {
			console.log('Could not connect to database');
			return;
		} else {
			console.log('Connected to MongoDB');
		}
	});
}