var expect = require("chai").expect;
var sinon = require("sinon");

describe("User", function() {

  var user;

  beforeEach(function() {
    var UserFixture = require('../fixtures/user');
    user = UserFixture.instance;
    user.save = sinon.spy();
  });

  afterEach(function() {
    user = null;
  });

  describe("#setFacebook", function() {
    it("should set facebook token, and profile", function() {
      var profile = {
        id: "1234"
      };
      user.setFacebook("1234", profile);
      expect(user.facebook.id).to.equal("1234");
      expect(user.facebook.token).to.equal("1234");
      expect(user.facebook.profile).to.equal(profile);
    });
  });

  describe("#unlinkFacebook", function() {
    it("should unset facebook token and profile", function() {
      user.unlinkFacebook();
      expect(user.facebook.token).to.equal(undefined);
      expect(user.facebook.profile).to.equal(undefined);
    });
  });

  describe("#setGoogle", function() {
    it("should set google token, email, and profile", function() {
      profile = {
        id: "1234",
        emails: [{ value: "foo@foo.com" }] 
      };
      user.setGoogle("1234", profile);
      expect(user.google.id).to.equal("1234");
      expect(user.google.token).to.equal("1234");
      expect(user.google.email).to.equal("foo@foo.com");
      expect(user.google.profile).to.equal(profile);
    });
  });

  describe("#unlinkGoogle", function() {
    it("should unset google token and profile", function() {
      user.unlinkGoogle();
      expect(user.google.token).to.equal(undefined);
      expect(user.google.profile).to.equal(undefined);
    });
  });

  describe("#setTwitter", function() {
    it("should set twitter token, secret, and profile", function() {
      user.setTwitter("1234", "ABCD", "fooProfile");
      expect(user.twitter.token).to.equal("1234");
      expect(user.twitter.tokenSecret).to.equal("ABCD");
      expect(user.twitter.profile).to.equal("fooProfile");
    });
  });

  describe("#unlinkTwitter", function() {
    it("should unset twitter token and profile", function() {
      user.unlinkTwitter();
      expect(user.twitter.token).to.equal(undefined);
      expect(user.twitter.profile).to.equal(undefined);
    });
  });

  describe("#setFoursquare", function() {
    it("should set foursquare token and profile", function() {
      user.setFoursquare("1234", "fooProfile");
      expect(user.foursquare.token).to.equal("1234");
      expect(user.foursquare.profile).to.equal("fooProfile");
    });
  });

  describe("#unlinkFoursquare", function() {
    it("should unset foursquare token and profile", function() {
      user.unlinkFoursquare();
      expect(user.foursquare.token).to.equal(undefined);
      expect(user.foursquare.profile).to.equal(undefined);
    });
  });

  describe("#setGithub", function() {
    it("should set github token and profile", function() {
      var profile = {
        email: 'foo@foo.com'
      };
      user.setGithub("1234", profile, null);
      expect(user.github.token).to.equal("1234");
      expect(user.github.profile).to.equal(profile);
      expect(user.github.email).to.equal("foo@foo.com");
    });
  });

  describe("#unlinkGithub", function() {
    it("should unset github token and profile", function() {
      user.unlinkGithub();
      expect(user.github.token).to.equal(undefined);
      expect(user.github.profile).to.equal(undefined);
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

  describe("#foursquarePhoto", function() {
    it("should return the correct url for photo", function() {
      user.foursquare.profile = {
        photo: {
          prefix: "foo/",
          suffix: "/bar"
        }
      };
      var photo = user.foursquarePhoto();
      expect(photo).to.equal("foo/original/bar");
    });
  });

  describe("#googlePhoto", function() {
    it("should return the correct url for photo", function() {
      user.google.profile = {
        image: {
          url: "foo?sz=50"
        }
      };
      var photo = user.googlePhoto();
      expect(photo).to.equal("foo?sz=200");
    });
  });
  
});