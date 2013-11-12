exports.setup = function ( mongoose ) {

  mongoose.connect('mongodb://localhost/glowmachine', function (err, result) {
    if (err) {
      console.log('Could not connect to MongoDB');
    } else {
      console.log('Connected to MongoDB...');
    }
  });

}
