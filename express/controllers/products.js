const products = {};

products.getAll = (req, res) => {
	res.end("Returned ALL products");
};

products.createProduct = (req, res) => {
	res.end("Added NEW product and return it");
};

products.getProduct = (req, res) => {
	res.end(`Returned SINGLE product ${req.params.id}`);
};

products.getProductReviews = (req, res) => {
	res.end(`Returned ALL reviews for a single product ${req.params.id}`);
};

export default products;
