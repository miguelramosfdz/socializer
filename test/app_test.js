describe('Server', function () {
  
  var app;

  beforeEach(function() {
    app = require('../config/server');  
  });

  afterEach(function() {
    app = null;
  });

  it('should be listening on port 3000', function() {
    expect(app.port).toEqual(3000);
  });

});
