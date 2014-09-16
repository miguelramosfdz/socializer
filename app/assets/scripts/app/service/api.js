(function() {
  "use strict";

  module.exports = {

    getView: function(view, callback) {
      var defer = new jQuery.Deferred();

      $.get("/templates/"+view)
        .success(function(data) {
          defer.resolve(data);
        })
        .error(function(data) {
          defer.reject(data);
        });

      return defer.promise();
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
    getCheckins: function(callback) {
      var defer = new jQuery.Deferred();

      $.get('/api/foursquare/checkins')
        .success(function(data) {
          defer.resolve(data);
        })
        .error(function(data) {
          defer.reject(data);
        });

      return defer.promise();
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

})();