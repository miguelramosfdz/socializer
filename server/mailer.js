var nodemailer = require('nodemailer');

var transport = {
    service: Hedgehog.mailer.service,
    auth: {
        user: Hedgehog.mailer.username,
        pass: Hedgehog.mailer.password
    }
};

var mailer = {

  transporter: nodemailer.createTransport(transport), 

  sendMailCallback: function (error, info) {
    if (error) return console.log(error);
    console.log('Message sent: ' + info.response);
  },

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
  }
};

exports = module.exports = mailer;


