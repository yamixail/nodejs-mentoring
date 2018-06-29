import "babel-register";
import express from "express";
import session from "express-session";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";

import app from "./app";
import router from "./routes";
import { user, secret } from "./consts/auth";
import { checkUser } from "./helpers/auth";

import cookieParser from "./middlewares/cookieParser";
import queryParser from "./middlewares/queryParser";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

passport.serializeUser((user, done) => done(null, jwt.sign(user, secret)));
passport.deserializeUser((token, done) => {
	jwt.verify(token, secret, (err, decoded) => {
		if (!err && checkUser(decoded)) {
			return done(null, decoded);
		}

		done(null, false, { message: "malformed token" });
	});
});

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

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(queryParser());
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	res.json({
		cookies: req.cookies,
		queries: req.parsedQuery
	});
});

app.use("/api", router);
