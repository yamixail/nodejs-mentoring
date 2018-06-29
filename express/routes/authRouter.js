import express from "express";
import passport from "passport";

import authController from "../controllers/auth";

const router = express.Router();

// router.post(
// 	"/",
// 	authController.setUserInfo,
// 	authController.authenticationResponse
// );

router.post(
	"/",
	(req, res, next) => {
		passport.authenticate("local", (err, user, info) => {
			req.login(user, err => {
				if (err) {
					return res.end(err.message);
				}

				res.json({
					err,
					user,
					info,
					reqUser: req.user,
					session: req.session
				});
			});
		})(req, res, next);
	},
	authController.authenticationResponse
);

router.get("/logout", (req, res) => {
	req.logout();
	res.end("logout sucess");
});

export default router;
