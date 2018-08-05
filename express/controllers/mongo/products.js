import Product from "../../models/mongo/product";

const products = {};

products.getAll = (req, res) => {
	Product.find({})
		.then(products => {
			return res.json(products);
		})
		.catch(err => res.status(500).message({ message: err.message }));
};

products.createProduct = (req, res) => {
	const { id, name, description, quantity, category, reviews } = req.body;

	Product.create({
		id,
		name,
		description,
		quantity: parseInt(quantity) || 0,
		category,
		reviews: []
	})
		.then(item => res.json(item))
		.catch(err => {
			console.error(err);

			res.status(500).json({ message: "something went wrong" });
		});
};

products.getProduct = (req, res) => {
	Product.findOne({ id: req.params.id })
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			res.json(product);
		})
		.catch(err =>
			res
				.status(500)
				.json({ message: "somthing went wrong" + err.message })
		);
};

products.getProductReviews = (req, res) => {
	Product.findOne({ id: req.params.id })
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			if (!product.reviews || !product.reviews.length) {
				return res.status(404).json({ message: "no reviews" });
			}

			res.json(product.reviews);
		})
		.catch(err =>
			res.status(500).message({ message: "somthing went wrong" })
		);
};

export default products;
