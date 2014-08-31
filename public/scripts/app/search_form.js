define(['jquery', 'backbone'], function($, Backbone) {

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
  
  $( "#radius" ).keyup(function() {
    $(this).val($scope.radius + ' miles');
  });
  
});