import express from "express";

const router = express.Router();

router
	.route("/")
	.get((req, res) => {
		res.end("Returned ALL products");
	})
	.post((req, res) => {
		res.end("Added NEW product and return it");
	});

router.get("/:id", (req, res) => {
	res.end(`Returned SINGLE product ${req.params.id}`);
});

router.get("/:id/reviews", (req, res) => {
	res.end(`Returned ALL reviews for a single product ${req.params.id}`);
});

export default router;
