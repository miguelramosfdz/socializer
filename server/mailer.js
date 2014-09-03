module.exports= (function() {

  var Hedgehog = require('../.hedgehog');
  var nodemailer = require('nodemailer');

  /**
   * Create reusable transporter object using SMTP transport
   */
  var transporter = nodemailer.createTransport({
      service: Hedgehog.mailer.service,
      auth: {
          user: Hedgehog.mailer.user,
          pass: Hedgehog.mailer.password
      }
  });

  return {

    /**
     * Send mail with defined transport object
     */
    sendMail: function() {
     transporter.sendMail({
          from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
          to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world ✔', // plaintext body
          html: '<b>Hello world ✔</b>' // html body
      }, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
      });   
    }

  };
  
});