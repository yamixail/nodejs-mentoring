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
			res.json({
				err,
				user,
				info,
				reqUser: req.user,
				session: req.session
			});
		})(req, res, next);
	},
	authController.authenticationResponse
);

export default router;
