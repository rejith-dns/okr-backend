var nodemailer = require("nodemailer");

const sendEmail = async (email, subject, data) => {
	var transporter = nodemailer.createTransport({
		host: process.env.HOST || 'smtp.sendgrid.net',
		port: 465,
		secure: true,
		auth: {
			user: process.env.HOST_USERNAME ||'apikey',
			pass: process.env.HOST_PASSWORD || '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',
		}
	});

	var mailOptions = {
		from:process.env.HOST_EMAIL || 'rejith.r@deepnetsoft.com',
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