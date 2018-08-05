import express from "express";

import usersController from "../../controllers/mongo/users";

const router = express.Router();

router.use((req, res, next) => {
	console.log(
		"mongo users router reached",
		usersController.getAll.toString()
	);
	next();
});

router.get("/", usersController.getAll);

router.use((err, req, res, next) => {
	console.log("mongo users router error");
	console.error(err);
	next(err);
});

export default router;
