var expect = require("chai").expect;
var sinon = require("sinon");
GLOBAL.Hedgehog = require("../.hedgehog");
var Mailer = require("../server/mailer");

describe('Mailer', function() {

  describe('#sendMail', function(){
    it('should pass sendMail correct params', function() {
      Hedgehog.mailer.email = 'fooEmail';
      Mailer.sendMailCallback = 'fooFunction';
      Mailer.transporter.sendMail = sinon.spy();
      Mailer.sendMail('foo@foo.com', 'fooSubject', 'fooText', 'fooHTML');
      expect(Mailer.transporter.sendMail.called).to.equal(true);
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