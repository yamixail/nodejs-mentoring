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
	passport.authenticate("local", { session: false }),
	authController.authenticationResponse
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
	"/facebook/callback",
	passport.authenticate("facebook"),
	authController.authenticationResponse
);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
	"/google/callback",
	passport.authenticate("google"),
	authController.authenticationResponse
);

export default router;
