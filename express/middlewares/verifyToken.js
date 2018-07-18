import jwt from "jsonwebtoken";
import passport from "passport";

import { checkUser } from "../helpers/auth";
import { secret } from "../consts/auth";

export default (req, res, next) => {
	const { token } = req.headers;

	if (!token) {
		return res
			.status(403)
			.json({ message: "user should be authenticated" });
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (!err && checkUser(decoded)) {
			return next();
		}

		res.status(403).json({ message: "malformed token" });
	});
};
