var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhoniroman5@gmail.com',
    pass: 'ccca kknm gsik cziv'
  }
});

var mailOptions = {
  from: 'dhoniroman5@gmail.com',
  to: 'prasannakithiyon53@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});