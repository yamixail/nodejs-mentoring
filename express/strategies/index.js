import passport from "passport";
import jwt from "jsonwebtoken";

import { secret } from "../consts/auth";
import { checkUser } from "../helpers/auth";

import applyLocalStrategy from "./local";
import applyFacebookStrategy from "./facebook";
import applyGoogleStrategy from "./google";

export default app => {
	passport.serializeUser((user, done) => done(null, jwt.sign(user, secret)));
	passport.deserializeUser((token, done) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (!err && checkUser(decoded)) {
				return done(null, decoded);
			}

			done(null, false, { message: "malformed token" });
		});
	});

	applyLocalStrategy(passport);
	applyFacebookStrategy(passport);
	applyGoogleStrategy(passport);

	app.use(passport.initialize());
	app.use(passport.session());
};
