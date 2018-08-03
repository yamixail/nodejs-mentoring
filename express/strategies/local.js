import { Strategy as LocalStrategy } from "passport-local";

import { findUser } from "../helpers/auth";

export default passport =>
	passport.use(
		new LocalStrategy(
			{
				usernameField: "login",
				passwordField: "password"
			},
			function(login, password, done) {
				if (!login || !password) {
					return done(new Error("no data"), false, {
						message: "something went wrong"
					});
				}

				const user = findUser({ login, password });

				if (user) {
					return done(null, user);
				}

				done(null, false, { message: "no such user" });
			}
		)
	);
