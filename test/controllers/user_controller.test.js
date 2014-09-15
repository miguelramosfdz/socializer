/* jshint strict:true */

describe("UserController", function() {
  "use strict";

  var req, res, user, UserController;
  
  GLOBAL.App = {};
  var sinon = require("sinon");
  var expect = require("chai").expect;
  var HttpFixtures = require('../fixtures/http');

  beforeEach(function() {
    var UserFixture = require('../fixtures/user');
    App.User = UserFixture.model;
    user = UserFixture.instance;
    user.save = sinon.spy();
    req = HttpFixtures.req();
    req.user = user;
    res = HttpFixtures.res();
    UserController = require("../../app/controllers/user_controller");
  });

  afterEach(function() {
    user = null;
    req = null;
    res = null;
    UserController = null;
  });

  describe("unlinkCallback", function() {
    var cb;

    beforeEach(function() {
      cb = UserController.unlinkCallback("FooBar", req, res);
    });

    afterEach(function() {
      cb = null;
    });

    it('should return function', function() {
      expect(typeof cb).to.equal("function");
    });

    it('should call req.flash with error if err', function () {
      cb(true);
      expect(req.flash.calledWith("error", "FooBar account could not be unlinked."));
      expect(res.redirect.calledWith("/account"));
    });
    
    it('should call req.flash with success if err', function () {
      cb(false);
      expect(req.flash.calledWith("success", "FooBar account unlinked!"));
      expect(res.redirect.calledWith("/account"));
    });
  });

  describe('#getSignUp', function() {
    it('should call res.render with correct args', function() {
      UserController.getSignUp(req, res);
      expect(res.render.calledWith("users/sign_up")).to.equal(true);
    });
  });

  describe("#getLogIn", function() {
    it('should call res.render with correct args', function() {
      UserController.getLogIn(req, res);
      expect(res.render.calledWith("users/sign_in")).to.equal(true);
    });
  });

  describe("#getAccount", function() {
    it('should call res.render with correct args', function() {
      UserController.getAccount(req, res);
      expect(res.render.calledWith("users/account")).to.equal(true);
    });
  });

  describe("#unlinkGoogle", function() {
    it("should set google token to undefined", function() {
      UserController.unlinkGoogle(req);
      expect(user.google.token).to.equal(undefined);
    });
  });

  describe("#unlinkFacebook", function() {
    it("should set facebook token to undefined", function() {
      UserController.unlinkFacebook(req);
      expect(user.facebook.token).to.equal(undefined);
    });
  });

  describe("#unlinkFoursquare", function() {
    it("should set foursquare token and profile to undefined", function() {
      UserController.unlinkFoursquare(req);
      expect(user.foursquare.token).to.equal(undefined);
      expect(user.foursquare.profile).to.equal(undefined);
    });
  });

  describe("#unlinkGithub", function() {
    it("should unset github token and profile", function() {
      UserController.unlinkGithub(req);
      expect(user.foursquare.token).to.equal(undefined);
      expect(user.foursquare.profile).to.equal(undefined);
    });
  });

  describe("#unlinkTwitter", function() {
    it("should set twitter token to undefined", function() {
      UserController.unlinkTwitter(req);
      expect(user.twitter.token).to.equal(undefined);
      expect(user.twitter.profile).to.equal(undefined);
    });
  });

  describe("#deleteAccount", function() {
    
    var User, sandbox;

    beforeEach(function() {
      User = {
        remove: sinon.spy()
      };
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      User = null;
      sandbox.restore();
    });

    it("should set twitter token to undefined", function() {
      req.user._id = "1";
      var next = sinon.spy();
      sandbox.stub(UserController, 'deleteAccountCallback');
      UserController.deleteAccount(req, res, next);
      expect(User.remove.calledWith({ _id: "1" })).to.equal(false);
    });
  });

  describe("#deleteAccountCallback", function() {
    
    var cb, next;

    beforeEach(function() {
      next = sinon.spy();
      cb = UserController.deleteAccountCallback(req, res, next);
    });

    afterEach(function() {
      cb = null;
      next = null;
    });

    describe("if error", function() {
      it("should call next with error", function() {
        cb("foo");
        expect(next.calledWith("foo"));
      });
      it("should not call req.logout", function() {
        cb("foo");
        expect(req.logout.called).to.equal(false);
      });
      it("should not call req.flash", function() {
        cb("foo");
        expect(req.flash.called).to.equal(false);
      });
      it("should not call res.redirect", function() {
        cb("foo");
        expect(res.redirect.called).to.equal(false);
      });
    });

    describe("if no error", function() {
      it("should call req.logout", function() {
        cb(false);
        expect(req.logout.called).to.equal(true);
      });
      it("should call req.flash with success", function() {
        cb(false);
        expect(req.flash.calledWith("success", "Your account has been deleted."))
          .to.equal(true);
      });
      it("should call res.redirect with correct path", function() {
        cb(false);
        expect(res.redirect.calledWith("/")).to.equal(true);
      });
    });
  });

});