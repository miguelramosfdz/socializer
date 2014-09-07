define(['jquery','backbone', 'api'], function($, Backbone, API) {

  if (window.location.pathname === '/foursquare') {
    var $scope = {
      
      template: _.template([
        "<li class='list-group-item'>",
          "<div class='row'>",
            "<div class='col-md-offset-3 col-md-6'>",
              "<%= venue.name %> in <%= venue.location.city %>, <%= venue.location.country %>",
            "</div>",
          "</div>",
        "</li>"
      ].join('')),
      
      map: null,

      mapEl: document.getElementById("checkins-map"),

      mapOptions: {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
      },

      initializeMap: function() {
        $scope.map = new google.maps.Map($scope.mapEl, $scope.mapOptions);
      }

    };

    /**
     * Initialize map
     */
    $scope.initializeMap();

    /**
     * Search Foursquare for user's checkins
     */
    API.getCheckins(function(data) {
      $('#checkins').html('');

      data.response.checkins.items.forEach(function(checkin) {
        var location = checkin.venue.location;
        var latLng = new google.maps.LatLng(location.lat, location.lng);
        var marker = new google.maps.Marker({
            position: latLng,
            title: checkin.venue.name
        });
        marker.setMap($scope.map);
        $scope.map.setCenter(marker.getPosition());
        $('#checkins').append($scope.template(checkin));
      });
    });    
  }

});