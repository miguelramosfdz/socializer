var sinon = require("sinon");
var assert = require("assert");
var Mailer = require("../server/mailer");
var Hedgehog = require("../.hedgehog");

describe('Mailer', function() {

  describe('#sendMail', function(){
    it('should pass sendMail correct params', function() {
      Hedgehog.mailer.email = 'fooEmail';
      Mailer.sendMailCallback = 'fooFunction';
      Mailer.transporter.sendMail = sinon.spy();
      Mailer.sendMail('foo@foo.com', 'fooSubject', 'fooText', 'fooHTML');
      Mailer.transporter.sendMail.called.should.equal.true;
      sinon.assert.calledWith(Mailer.transporter.sendMail, {
        from: 'fooEmail',
        to: 'foo@foo.com',
        subject: 'fooSubject',
        text: 'fooText',
        html: 'fooHTML'
      }, 'fooFunction');
    });
  });


});