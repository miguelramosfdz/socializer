define(['jquery','backbone', 'api'], function($, Backbone, API) {

  var $scope = {};
  $scope.template = _.template([
    "<li class='list-group-item'>",
      "<div class='row'>",
        "<div class='col-md-offset-3 col-md-6'>",
          "<%= venue.name %> in <%= venue.location.city %>, <%= venue.location.country %>",
        "</div>",
      "</div>",
    "</li>"
  ].join(''));

  $('#foursquare-search').submit(function(e) {
    /**
     * Prevent default form behaviour
     */
    e.preventDefault();

    /**
     * Search Foursquare for user's checkins
     */
    API.searchFoursquare({ email: this.username.value }, function(data) {
      var checkins = data.response.checkins.items.map(function(checkin) {
        var location = checkin.venue.location;
        return $scope.template(checkin);
      }).join('');

      $('#checkins').append(checkins);
    });
  });

});