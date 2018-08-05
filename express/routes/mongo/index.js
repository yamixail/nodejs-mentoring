import express from "express";

import usersRouter from "./users";
import productsRouter from "./products";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);

export default router;
