define(['jquery', 'backbone', 'api'], function($, Backbone, API) {

  var $scope = this;

  $scope.template = _.template([
    "<li class='list-group-item'>",
      "<div class='row'>",
        "<div class='col-md-3'>",
          "<img src='<%= user.profile_image_url %>' />",
        "</div>",
        "<div class='col-md-3'>",
          "<div class='tweet-user'><h5><%= user.screen_name %></h5></div>",
          "<div class='tweet-text'><%= text %></div>",
        "</div>",
      "</div>",
    "</li>"
  ].join(''));

  $("#twitter-search").submit(function(e) {
    /**
     * Prevent default behaviour of form submission
     */
    e.preventDefault();
    
    /**
     * Make object of request parameters
     * @type {Object}
     */
    var requestParams = {
      query: this.query.value,
      location: this.location.value,
      radius: this.radius.value
    };

    /**
     * Make API call through service
     */
    API.searchTwitter(requestParams, function(data) {
      var statuses = data.tweets.statuses.map(function(tweet) {
        return $scope.template(tweet);
      });

      $('#tweets').append(statuses.join(''));
    });

  });
  
});