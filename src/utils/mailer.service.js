var nodemailer = require("nodemailer");

const sendEmail = async (email, subject, data) => {
	var transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 465,
		secure: true,
		auth: {
			user: 'apikey',
			pass: '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',
		}
	});

	var mailOptions = {
		from:'jinu.m@deepnetsoft.com',
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
