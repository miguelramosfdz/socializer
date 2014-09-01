module.exports = (function() {
  "use strict";
  
  var db;
  var secrets = require('secrets');
  var mongoose = require('mongoose');

  return {

    /**
     * Connect to MongoDB.
     */
    connect: function() {
      mongoose.connect(secrets.db);

      db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        console.log('Connected to MongoDB');
      });
    },
    db: db
  };

})();