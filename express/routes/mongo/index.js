import express from "express";

import usersRouter from "./users";
import productsRouter from "./products";
import citiesRouter from "./cities";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/cities", citiesRouter);

export default router;
