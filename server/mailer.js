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
    sendMail: function(email, subject, text) {
     transporter.sendMail({
          from: 'cjponti@gmail.com', // sender address
          to: email, // list of receivers
          subject: subject, // Subject line
          text: text, // plaintext body
          html: html // html body
      }, function(error, info){
        if (error) return console.log(error);
        console.log('Message sent: ' + info.response);
      });
    }

  };
  
})();