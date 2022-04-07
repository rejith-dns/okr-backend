var nodemailer = require("nodemailer");

const sendEmail = async (email, subject, data) => {
	var transporter = nodemailer.createTransport({
		host: process.env.HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.HOST_USERNAME,
			pass: process.env.HOST_PASSWORD,
		}
	});

	var mailOptions = {
		from:process.env.HOST_EMAIL,
		to: email,
		subject: subject,
		html: data
	};
	try {
		let info = await transporter.sendMail(mailOptions);
		console.log(info.messageId,'message')
		return info.messageId ? true : false;
	} catch (err) {
		// logger.error(err)
		return false;
	}
};

module.exports = sendEmail;