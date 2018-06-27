export default () => (req, res, next) => {
	// url.parse(req.url, true).query
	req.parsedQuery = req.query;

	next();
};
