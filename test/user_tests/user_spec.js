var expect = require("chai").expect;
var sinon = require("sinon");

describe("User", function() {

  var user;

  beforeEach(function() {
    user = require("../fixtures/user");
    user.save = sinon.spy();
  });

  afterEach(function() {
    user = null;
  });

  describe("#setTwitterProfile", function() {
    it("should set twitter token, secret, and profile", function() {
      user.setTwitterProfile("1234", "ABCD", "fooProfile");
      expect(user.twitter.token).to.equal("1234");
      expect(user.twitter.tokenSecret).to.equal("ABCD");
      expect(user.twitter.profile).to.equal("fooProfile");
    });
  });

  describe("#setFoursquareProfile", function() {
    it("should set foursquare token and profile", function() {
      user.setFoursquareProfile("1234", "fooProfile");
      expect(user.foursquare.token).to.equal("1234");
      expect(user.foursquare.profile).to.equal("fooProfile");
    });
  });

  describe("#foursquareName", function() {
    it("should return correct name", function() {
      user.foursquare.profile = {
        firstName: 'Foo',
        lastName: 'Bar'
      };
      var name = user.foursquareName();
      expect(name).to.equal("Foo Bar");
    });
  });

});