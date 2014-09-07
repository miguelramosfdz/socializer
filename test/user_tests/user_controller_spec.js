/* jshint strict:true */

var assert = require("assert");
var should = require("should");
var sinon = require("sinon");
var User = require("../../app/models/User");

describe("UserController", function() {
  "use strict";

  var req, user, UserController;

  beforeEach(function() {
    user = new User();
    user.save = sinon.spy();
    req = {
      user: user
    };
    UserController = require("../../app/controllers/user_controller");
  });

  afterEach(function() {
    UserController = null;
  });

   // unlinkFacebook: function(req, res) {
   //    var user = req.user;
   //    user.facebook.token = undefined;
   //    user.save(function() {
   //       res.redirect("/profile");
   //    });
   //  },

    // unlinkGoogle: function(req, res) {
    //   var user = req.user;
    //   user.google.token = undefined;
    //   user.save(function() {
    //      res.redirect("/profile");
    //   });
    // },

    // unlinkFoursquare: function(req, res) {
    //   var user = req.user;
    //   user.foursquare.token = undefined;
    //   user.save(function() {
    //      res.redirect("/profile");
    //   });
    // }
  describe("#unlinkTwitter", function() {
    it("should set foursquare token to undefined", function() {
      UserController.unlinkFoursquare(req);
      user.foursquare.token.should.eq(undefined);
    });
  });

});