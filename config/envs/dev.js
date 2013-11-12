exports.setup = function (app, express) {

  app.configure('development', function () {
    app.use(express.errorHandler({showStack: true}));
  })

}