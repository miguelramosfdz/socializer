define(['jquery'], function($) {
  "use strict";

  return {

    getView: function(view, callback) {
      $.get("/views/"+view, callback);
    },

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
      $.get('/api/foursquare/checkins', options, callback);
    },

    /**
     * Get Github Issues
     */
    getGithubIssues: function(options, callback) {
      $.get('/api/github/issues', options || {}, callback);
    },

    getGithubIssue: function(issue, callback) {
      $.get('/api/github/issue/', { url: issue.get('url') }, callback);
    }
  };

});