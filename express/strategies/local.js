import { Strategy as LocalStrategy } from "passport-local";

export default passport =>
	passport.use(
		new LocalStrategy(
			{
				usernameField: "login",
				passwordField: "password"
			},
			function(login, password, done) {
				if (err) {
					done(err, false, { message: "something went wrong" });
				} else if (!checkUser({ login, password })) {
					done(null, false, { message: "no such user" });
				} else {
					done(null, user);
				}
			}
		)
	);
