/**
 * Configure RequireJS
 */
requirejs.config({
    
  baseUrl: '/../scripts',
  
  paths: {
    api: '/scripts/app/service/api',
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
  'app/router'
], function(Router) {
  Router.initialize();
  $('.container').height($(window).height());
  console.log('App loaded.');
});