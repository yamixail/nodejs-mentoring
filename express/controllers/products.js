import db from "../models";

const products = {};

products.getAll = (req, res) => {
	db.Product.findAll()
		.then(products => {
			return res.json(products);
		})
		.catch(err => res.status(500).message({ message: err.message }));
};

products.createProduct = (req, res) => {
	const { id, name, description, quantity, category, reviews } = req.body;

	db.Product.create({
		id,
		name,
		description,
		quantity: parseInt(quantity) || 0,
		category,
		reviews
	})
		.then(item => res.json(item.toJSON()))
		.catch(err => {
			console.error(err);

			res.status(500).json({ message: "something went wrong" });
		});
};

products.getProduct = (req, res) => {
	db.Product.findById(req.params.id)
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			res.json(product);
		})
		.catch(err =>
			res.status(500).message({ message: "somthing went wrong" })
		);
};

products.getProductReviews = (req, res) => {
	db.Product.findById(req.params.id)
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			if (!product.reviews) {
				return res.status(404).json({ message: "no reviews" });
			}

			res.json(product.reviews);
		})
		.catch(err =>
			res.status(500).message({ message: "somthing went wrong" })
		);
};

export default products;
