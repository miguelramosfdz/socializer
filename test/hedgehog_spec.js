var expect = require("chai").expect;
var Hedgehog = require("../.hedgehog");

describe("Hedgehog", function() {

  describe("port", function() {
    it("should be defined", function() {
      expect(Hedgehog.port).not.to.equal(undefined);
      expect(Hedgehog.port).not.to.equal(null);
    });
  });

  describe("appName", function() {
    it("should be defined", function() {
      expect(Hedgehog.appName).not.to.equal(undefined);
      expect(Hedgehog.appName).not.to.equal(null);
    });
  });

  describe("sessionSecret", function() {
    it("should be defined", function() {
      expect(Hedgehog.sessionSecret).not.to.equal(undefined);
      expect(Hedgehog.sessionSecret).not.to.equal(null);
    });
  });

  describe("oauth", function() {
    describe("Facebook", function() {
      var social;

      beforeEach(function() {
        social = Hedgehog.oauth.Facebook;
      });

      afterEach(function() {
        social = null;
      });

      it("should have appId", function() {
        expect(social.appId).not.to.equal(undefined);
        expect(social.appId).not.to.equal(null);
      });
      it("should have appSecret", function() {
        expect(social.appSecret).not.to.equal(undefined);
        expect(social.appSecret).not.to.equal(null);
      });
      it("should have callbackURL", function() {
        expect(social.callbackURL).not.to.equal(undefined);
        expect(social.callbackURL).not.to.equal(null);
      });
    });

    describe("Twitter", function() {
      var social;

      beforeEach(function() {
        social = Hedgehog.oauth.Twitter;
      });

      afterEach(function() {
        social = null;
      });

      it("should have consumer_key", function() {
        expect(social.consumer_key).not.to.equal(undefined);
        expect(social.consumer_key).not.to.equal(null);
      });
      it("should have consumer_secret", function() {
        expect(social.consumer_secret).not.to.equal(undefined);
        expect(social.consumer_secret).not.to.equal(null);
      });
      it("should have callback_url", function() {
        expect(social.callback_url).not.to.equal(undefined);
        expect(social.callback_url).not.to.equal(null);
      });
    });

    describe("Google", function() {
      var social;

      beforeEach(function() {
        social = Hedgehog.oauth.Google;
      });

      afterEach(function() {
        social = null;
      });

      it("should have realm", function() {
        expect(social.realm).not.to.equal(undefined);
        expect(social.realm).not.to.equal(null);
      });
      it("should have clientID", function() {
        expect(social.clientID).not.to.equal(undefined);
        expect(social.clientID).not.to.equal(null);
      });
      it("should have clientSecret", function() {
        expect(social.clientSecret).not.to.equal(undefined);
        expect(social.clientSecret).not.to.equal(null);
      });
      it("should have callbackURL", function() {
        expect(social.callbackURL).not.to.equal(undefined);
        expect(social.callbackURL).not.to.equal(null);
      });
    });

    describe("Foursquare", function() {
      var keys;

      beforeEach(function() {
        keys = Hedgehog.oauth.Foursquare;
      });

      afterEach(function() {
        keys = null;
      });
      
      it("should have client_id", function() {
        expect(keys.client_id).not.to.equal(undefined);
        expect(keys.client_id).not.to.equal(null);
      });
      it("should have client_secret", function() {
        expect(keys.client_secret).not.to.equal(undefined);
        expect(keys.client_secret).not.to.equal(null);
      });
      it("should have callback_url", function() {
        expect(keys.callback_url).not.to.equal(undefined);
        expect(keys.callback_url).not.to.equal(null);
      });
    });
  });
  
  describe("db", function() {
    var keys;

    beforeEach(function() {
      keys = Hedgehog.db;
    });

    afterEach(function() {
      keys = null;
    });

    it("should have have test", function() {
      expect(keys.test).not.to.equal(undefined);
      expect(keys.test).not.to.equal(null);
    });
    it("should have development", function() {
      expect(keys.development).not.to.equal(undefined);
      expect(keys.development).not.to.equal(null);
    });
    it("should have production", function() {
      expect(keys.production).not.to.equal(undefined);
      expect(keys.production).not.to.equal(null);
    });
    it("should have sessionStore", function() {
      expect(keys.sessionStore).not.to.equal(undefined);
      expect(keys.sessionStore).not.to.equal(null);
    });
  });

  describe("mailer", function() {
    var mailer;

    beforeEach(function() {
      mailer = Hedgehog.mailer;
    });

    afterEach(function() {
      mailer = null;
    });

    it("should have email", function() {
      expect(mailer.email).not.to.equal(undefined);
      expect(mailer.email).not.to.equal(null);
    });
    it("should have service", function() {
      expect(mailer.service).not.to.equal(undefined);
      expect(mailer.service).not.to.equal(null);
    });
    it("should have username", function() {
      expect(mailer.username).not.to.equal(undefined);
      expect(mailer.username).not.to.equal(null);
    });
    it("should have password", function() {
      expect(mailer.password).not.to.equal(undefined);
      expect(mailer.password).not.to.equal(null);
    });
  });

});
