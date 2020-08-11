const router = require('express-promise-router')()
var nodemailer = require('nodemailer');
const Password = process.env.EMAILPASSWORD

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'scavengewithfriends@gmail.com',
    pass: Password
  }
});

var mailOptions = {
  from: 'scavenge@gmail.com',
  to: 'brendanschatz97@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};



router.post('/send', (req,res) => {
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json('Email sent: ' + info.response);
        }
      });
})

module.exports = router