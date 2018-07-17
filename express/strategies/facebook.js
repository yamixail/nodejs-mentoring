import { Strategy as FacebookStrategy } from "passport-facebook";

import { facebookConfig } from "../config/strategies";
import { findUser } from "../helpers/auth";

export default passport =>
	passport.use(
		new FacebookStrategy(
			facebookConfig,
			(accessToken, refreshToken, profile, done) => {
				const user = findUser({ login: "admin", password: "admin" });

				if (!user) {
					return done(null, false, { message: "user doesn't exist" });
				}

				done(null, user);
			}
		)
	);
