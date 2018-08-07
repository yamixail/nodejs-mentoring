import express from "express";

import citiesController from "../../controllers/mongo/cities";

const router = express.Router();

router
	.route("/")
	.get(citiesController.getAll)
	.post(citiesController.createCity);

router
	.route("/:id")
	.get(citiesController.getCity)
	.put(citiesController.putCity)
	.delete(citiesController.deleteCity);

export default router;
