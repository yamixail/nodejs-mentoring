import express from "express";

import verifyToken from "../middlewares/verifyToken";

import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import usersRouter from "./usersRouter";

const router = express.Router();

router.use("/auth", authRouter);

router.use(verifyToken);

router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;
