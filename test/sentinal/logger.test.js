describe("Sentinal.logger", function() {

  var logger, req;
  var sinon = require("sinon");
  var expect = require("chai").expect;

  beforeEach(function() {
    req = {
      user: null,
      session: {
        user: null
      }
    };
    logger = require("../../server/sentinal/sentinal").logger;
  });

  afterEach(function() {
    logger = null;
    req = null;
  });

  describe("#isAuthenticated", function() {
    it("should return true if user", function() {
      req.user = true;
      expect(logger.isAuthenticated.apply(req)).to.equal(true);
    });
    it("should return false if no user", function() {
      req.user = false;
      expect(logger.isAuthenticated.apply(req)).to.equal(false);
    });
  });

  describe("#logIn", function() {
    it("should set value of req.session", function() {
      logger.logIn.call(req, { id: "foo" });
      expect(req.session.user).to.equal("foo");
    });
  });

  describe("#deserialize_user", function() {
    var func, callback, next;

    beforeEach(function() {
      callback = sinon.spy();
      func = logger.deserialize_user(callback);
      next = sinon.spy();
      logger.deserialize_done = sinon.spy();
    });

    afterEach(function() {
      func = null;
    });

    it("should return a function", function() {
      expect(typeof func).to.equal("function");
    });
    it("should call next if no req.session", function() {
      req.session = null;
      func(req, null, next);
      expect(next.called).to.equal(true);
    });
    it("should call next if no req.session.user", function() {
      func(req, null, next);
      expect(next.called).to.equal(true);
    });
    it("should call callback if req.session && req.session", function() {
      req.session.user = "meow";
      func(req, null, next);
      expect(callback.called).to.equal(true);
    });
  });

  describe("#logOut", function() {
    it("should set value of req.session", function() {
      logger.logOut.call(req);
      expect(req.session.user).to.equal(undefined);
    });
  });

});
