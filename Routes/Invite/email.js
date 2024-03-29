const router = require("express-promise-router")();
var nodemailer = require("nodemailer");
const Password = process.env.EMAILPASSWORD;

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "scavengewithfriends@gmail.com",
		pass: Password,
	},
});

router.post("/send", (req, res) => {
	var mailOptions = {
		from: "scavenge@gmail.com",
		to: req.body.email,
		subject: "You have been challenged!",
		text: req.body.message,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.status(400).json(error);
		} else {
			res.status(200).json("Email sent: " + info.response);
		}
	});
});

module.exports = router;
