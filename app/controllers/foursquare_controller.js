"use strict";

module.exports = {
   
  getCheckins: function(req, res) {
    if (process.env.NODE_ENV !== 'development') {
      req.user.FoursquareApi()
        .get("users/self/checkins", function(data) {
          if (data.meta.code === 400) {
            res.status(400).json({ message: data.meta.errorDetail });
          } else {
            res.status(200).json(data);  
          }
        });        
    } else {
      var json = require("./fixtures/foursquare_checkins");
      res.status(200).json(json);
    }

  },

  postSearch: function(req, res) {
    req.user.FoursquareApi()
      .get('users/search?email='+req.body.email, function(data) {
          if (data.meta.code === 400) {
            res.status(400).json({ message: data.meta.errorDetail });
          } else {
            res.status(200).json(data);  
          }
      });
  }

};
