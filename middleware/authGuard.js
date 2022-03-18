const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require("../src/modules/user/model").User;
dotenv.config({ path: './config.env' });

module.exports = (req, res, next) => {

	try {
		let isError = false;
		let token 
		if(req.body.token){
			token=req.body.token
		}else{
			const authHeader = req.headers["Authorization"] || req.headers["authorization"];
			if (!authHeader) {
				isError = true
				return res.status(401).json({ message: "User is not authenticated." });
			}
			 token = authHeader && authHeader.split(" ")[1];
		}
		

		jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
			if (err) {
				isError = true
				return res.status(401).json({ message: "Unauthorised" });
			}

			if (!isError) {
				const { user_id, iat } = payload;
				try {
					User.findOne({ "_id": user_id }).then((userData) => {
						if (userData) {
							req.user = userData;
							next();
						} else {
							return res.status(401).json({ message: "Session Expired! Please log in again." });
						}

					});
				} catch (err) {
					logger.error(err)
					return res.status(401).json({ message: "Authorization Error" });
				}

			}

		});
	} catch (err) {
		logger.error(err)
		throw new error("Authorization Error");
	}
};