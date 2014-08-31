define(['jquery', 'backbone'], function($, Backbone) {

  $( "#radius" ).keyup(function() {
    $(this).val($scope.radius + ' miles');
  });
  
});