/**
 * Configure RequireJS
 */
requirejs.config({
    
  baseUrl: '/../scripts',
  
  paths: {
    api: '/scripts/app/api_service',
    jquery: '/libs/jquery/dist/jquery.min',
    underscore: '/libs/underscore/underscore-min',
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',
    backbone: '/libs/backbone/backbone'
  }

});

/**
 * Load application
 */
requirejs([
    'app/main',
    'app/foursquare_search'
], function() {
  $('.container').height($(window).height());
  console.log('App loaded.');
});