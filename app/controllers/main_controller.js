module.exports = (function() {
  "use strict";

  return {
    root: function ( req, res, next ) {
      res.render('index');
    },

    error: function ( req, res, next ) {
      res.render('static/error');
    },

    options: function (req, res) {
      res.send("");
    },

    serveTemplates: function ( req, res, next ) {
      res.render('templates/' + req.params.type + '/' + req.params.name);
    }
  };

})();