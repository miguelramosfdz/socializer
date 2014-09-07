var assert = require("assert");
var should = require("should");
var Hedgehog = require("../.hedgehog");

describe("Hedgehog", function() {

  describe("port", function() {
    it("should be defined", function() {
      Hedgehog.should.have.property("port");
      Hedgehog.port.should.not.equal(null);
      Hedgehog.port.should.not.equal(undefined);
    });
  });

  describe("appName", function() {
    it("should be defined", function() {
      Hedgehog.should.have.property("appName");
      Hedgehog.appName.should.not.equal(null);
      Hedgehog.appName.should.not.equal(undefined);
    });
  });

  describe("sessionSecret", function() {
    it("should be defined", function() {
      Hedgehog.should.have.property("sessionSecret");
      Hedgehog.sessionSecret.should.not.equal(null);
      Hedgehog.sessionSecret.should.not.equal(undefined);
    });
  });

  describe("oauth", function() {
    describe("Facebook", function() {
      it("should have appId", function() {
        Hedgehog.oauth.Facebook.should.have.property("appId");
        Hedgehog.oauth.Facebook.appId.should.not.equal(null);
        Hedgehog.oauth.Facebook.appId.should.not.equal(undefined);
      });
      it("should have appSecret", function() {
        Hedgehog.oauth.Facebook.should.have.property("appSecret");
        Hedgehog.oauth.Facebook.appSecret.should.not.equal(null);
        Hedgehog.oauth.Facebook.appSecret.should.not.equal(undefined);
      });
      it("should have callbackURL", function() {
        Hedgehog.oauth.Facebook.should.have.property("callbackURL");
        Hedgehog.oauth.Facebook.callbackURL.should.not.equal(null);
        Hedgehog.oauth.Facebook.callbackURL.should.not.equal(undefined);
      });
    });
    describe("Twitter", function() {
      it("should have consumerKey", function() {
        Hedgehog.oauth.Twitter.should.have.property("consumerKey");
        Hedgehog.oauth.Twitter.consumerKey.should.not.equal(null);
        Hedgehog.oauth.Twitter.consumerKey.should.not.equal(undefined);
      });
      it("should have consumerSecret", function() {
        Hedgehog.oauth.Twitter.should.have.property("consumerSecret");
        Hedgehog.oauth.Twitter.consumerSecret.should.not.equal(null);
        Hedgehog.oauth.Twitter.consumerSecret.should.not.equal(undefined);
      });
      it("should have callbackURL", function() {
        Hedgehog.oauth.Twitter.should.have.property("callbackURL");
        Hedgehog.oauth.Twitter.callbackURL.should.not.equal(null);
        Hedgehog.oauth.Twitter.callbackURL.should.not.equal(undefined);
      });
    });
    describe("Google", function() {
      it("should have realm", function() {
        Hedgehog.oauth.Google.should.have.property("realm");
        Hedgehog.oauth.Google.realm.should.not.equal(null);
        Hedgehog.oauth.Google.realm.should.not.equal(undefined);
      });
      it("should have clientID", function() {
        Hedgehog.oauth.Google.should.have.property("clientID");
        Hedgehog.oauth.Google.clientID.should.not.equal(null);
        Hedgehog.oauth.Google.clientID.should.not.equal(undefined);
      });
      it("should have clientSecret", function() {
        Hedgehog.oauth.Google.should.have.property("clientSecret");
        Hedgehog.oauth.Google.clientSecret.should.not.equal(null);
        Hedgehog.oauth.Google.clientSecret.should.not.equal(undefined);
      });
      it("should have callbackURL", function() {
        Hedgehog.oauth.Google.should.have.property("callbackURL");
        Hedgehog.oauth.Google.callbackURL.should.not.equal(null);
        Hedgehog.oauth.Google.callbackURL.should.not.equal(undefined);
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
        keys.should.have.property("client_id");
        keys.client_id.should.not.equal(null);
        keys.client_id.should.not.equal(undefined);
      });
      it("should have client_secret", function() {
        keys.should.have.property("client_secret");
        keys.client_secret.should.not.equal(null);
        keys.client_secret.should.not.equal(undefined);
      });
      it("should have callback_url", function() {
        keys.should.have.property("callback_url");
        keys.callback_url.should.not.equal(null);
        keys.callback_url.should.not.equal(undefined);
      });
    });
  });
  
  describe("db", function() {
    it("should have have test", function() {
      Hedgehog.db.should.have.property("test");
      Hedgehog.db.test.should.not.equal(null);
      Hedgehog.db.test.should.not.equal(undefined);
    });
    it("should have development", function() {
      Hedgehog.db.should.have.property("development");
      Hedgehog.db.development.should.not.equal(null);
      Hedgehog.db.development.should.not.equal(undefined);
    });
    it("should have production", function() {
      Hedgehog.db.should.have.property("production");
      Hedgehog.db.production.should.not.equal(null);
      Hedgehog.db.production.should.not.equal(undefined);
    });
    it("should have sessionStore", function() {
      Hedgehog.db.should.have.property("sessionStore");
      Hedgehog.db.sessionStore.should.not.equal(null);
      Hedgehog.db.sessionStore.should.not.equal(undefined);
    });
  });

  describe("mailer", function() {
    it("should have service", function() {
      Hedgehog.mailer.should.have.property("service");
      Hedgehog.mailer.service.should.not.equal(null);
      Hedgehog.mailer.service.should.not.equal(undefined);
    });
    it("should have production", function() {
      Hedgehog.mailer.should.have.property("username");
      Hedgehog.mailer.username.should.not.equal(null);
      Hedgehog.mailer.username.should.not.equal(undefined);
    });
    it("should have sessionStore", function() {
      Hedgehog.mailer.should.have.property("password");
      Hedgehog.mailer.password.should.not.equal(null);
      Hedgehog.mailer.password.should.not.equal(undefined);
    });
    it("should have email", function() {
      Hedgehog.mailer.should.have.property("email");
      Hedgehog.mailer.email.should.not.equal(null);
      Hedgehog.mailer.email.should.not.equal(undefined);
    });
  });

});
