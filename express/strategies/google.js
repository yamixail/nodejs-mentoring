import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { googleConfig } from "../config/strategies";
import { findUser } from "../helpers/auth";

export default passport =>
	passport.use(
		new GoogleStrategy(
			googleConfig,
			(token, tokenSecret, profile, done) => {
				const user = findUser({ login: "admin", password: "admin" });

				if (!user) {
					return done(null, false, { message: "user doesn't exist" });
				}

				done(null, user);
			}
		)
	);
