import express from "express";

import usersController from "../controllers/users";

const router = express.Router();

router.get("/", usersController.getAll);

export default router;
