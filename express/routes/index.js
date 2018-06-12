import express from "express";

import productsRouter from "./productsRouter";
import usersRouter from "./usersRouter";

const router = express.Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;
