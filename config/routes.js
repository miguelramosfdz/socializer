/*jshint strict:false */

exports.setup = function(app) {

  app.get('/', function(req, res){
    res.render('layout', { title: 'Express' });
  });

  app.get('/partials/:type/:file', function(req, res) {
    res.render('/partials'+req.params.type+'/'+req.params.file);
  });

};