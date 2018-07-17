import jwt from "jsonwebtoken";
import passport from "passport";

import { secret } from "../consts/auth";
import { findUser } from "../helpers/auth";

const auth = {};

auth.setUserInfo = (req, res, next) => {
	const user = findUser(req.body);

	if (user) {
		req.user = user;
	}

	next();
};

auth.authenticationResponse = (req, res) => {
	if (!req.user) {
		return res.json({
			code: 404,
			message: "User Not Found"
		});
	}

	res.json({
		code: 200,
		message: "OK",
		data: {
			user: {
				email: req.user.email,
				username: req.user.login
			}
		},
		token: jwt.sign(req.user, secret)
	});
};

export default auth;
