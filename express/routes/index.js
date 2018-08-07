import express from "express";
import passport from "passport";

import verifyToken from "../middlewares/verifyToken";

import authRouter from "./authRouter";
// import productsRouter from "./productsRouter";
// import usersRouter from "./usersRouter";
import mongoRouter from "./mongo";

const router = express.Router();

router.use("/auth", authRouter);

router.use(verifyToken);
// router.use(passport.authorize("local"));

// router.use("/products", productsRouter);
// router.use("/users", usersRouter);

router.use("/mongo", mongoRouter);

export default router;
