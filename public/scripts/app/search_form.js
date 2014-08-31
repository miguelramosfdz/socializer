define(['jquery', 'backbone', 'api'], function($, Backbone, API) {

  var $scope = this;

  $scope.template = [
    "<div class='tweet'>",
       "<div class='tweet-user-image' >",
         "<img src='{{tweet.user.profile_image_url}}' />",
        "<div class='tweet-data'>",
          "<div class='tweet-user'>{{ tweet.user.name }}</div>",
          "<div class='tweet-text'> {{ tweet.text }}</div>",
        "</div>",
      "</div>",
    "</div>"
  ].join('');

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
      
    });

  });

  $( "#radius" ).keyup(function() {
    $(this).val($scope.radius + ' miles');
  });
  
});