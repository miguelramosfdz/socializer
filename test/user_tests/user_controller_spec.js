/* jshint strict:true */

var assert = require("assert");
var sinon = require("sinon");
var expect = require("chai").expect;

describe("UserController", function() {
  "use strict";

  var req, user, UserController;

  beforeEach(function() {
    user = require('../fixtures/user');
    user.save = sinon.spy();
    req = {
      user: user
    };
    UserController = require("../../app/controllers/user_controller");
  });

  afterEach(function() {
    user = null;
    req = null;
    UserController = null;
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

  describe("#unlinkTwitter", function() {
    it("should set twitter token to undefined", function() {
      UserController.unlinkTwitter(req);
      expect(user.twitter.token).to.equal(undefined);
      expect(user.twitter.profile).to.equal(undefined);
    });
  });

});