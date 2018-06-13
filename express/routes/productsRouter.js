import express from "express";

import productsController from "../controllers/products";

const router = express.Router();

router
	.route("/")
	.get(productsController.getAll)
	.post(productsController.createProduct);

router.get("/:id", productsController.getProduct);

router.get("/:id/reviews", productsController.getProductReviews);

export default router;
