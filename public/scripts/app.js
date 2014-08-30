requirejs.config({
    
    baseUrl: '/../scripts',
    
    paths: {
        jquery: '/libs/jquery/dist/jquery.min',
        underscore: '/libs/underscore/underscore-min',
        bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',
        backbone: '/libs/backbone/backbone',
    }

});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main'], function() {

});