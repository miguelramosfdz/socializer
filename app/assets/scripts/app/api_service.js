define(['jquery'], function($) {
  "use strict";

  return {

    /**
     * Search twitter based on query
     * @param {Object} options
     *        @param {String} options.query
     *        @param {String} options.location
     *        @param {String} options.radius
     * @param {Function} callback
     */
    searchTwitter: function(options, callback) {
      $.post('/twitter/search', {
          query: options.query,
          location: options.location,
          radius: options.radius
        }, callback);
    },

    /**
     * Search Foursquare
     * @param  {Object}   options
     * @param  {Function} callback
     */
    getCheckins: function(options, callback) {
      $.get('/foursquare/checkins', options, callback);
    }
  };

});