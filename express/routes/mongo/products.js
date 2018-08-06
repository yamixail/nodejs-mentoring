import express from "express";

import productsController from "../../controllers/mongo/products";

const router = express.Router();

router
	.route("/")
	.get(productsController.getAll)
	.post(productsController.createProduct);

router
	.route("/:id")
	.get(productsController.getProduct)
	.delete(productsController.deleteProduct);

router.get("/:id/reviews", productsController.getProductReviews);

export default router;
