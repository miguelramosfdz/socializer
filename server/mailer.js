module.exports= (function() {

  var Hedgehog = require('../.hedgehog');
  var nodemailer = require('nodemailer');

  var mailer =  {

    /**
     * Create reusable transporter object using SMTP transport
     */
    transporter: nodemailer.createTransport({
        service: Hedgehog.mailer.service,
        auth: {
            user: Hedgehog.mailer.username,
            pass: Hedgehog.mailer.password
        }
    }),

    /**
     * Send mail with defined transport object
     * @param {Array} email List of receivers
     * @param {String} email Subject line
     * @param {String} email Plain text body
     * @param {String} email HTML body
     */
    sendMail: function(email, subject, text, html) {
      mailer.transporter.sendMail({
          from: Hedgehog.mailer.email,
          to: email,
          subject: subject,
          text: text,
          html: html
      }, mailer.sendMailCallback);
    },

    sendMailCallback: function(error, info){
      if (error) return console.log(error);
      console.log('Message sent: ' + info.response);
    }

  };

  return mailer;
  
})();