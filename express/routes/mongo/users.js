import express from "express";

import usersController from "../../controllers/mongo/users";

const router = express.Router();

router.get("/", usersController.getAll);

router
	.route("/:id")
	.get(usersController.getUser)
	.delete(usersController.deleteUser);

export default router;
