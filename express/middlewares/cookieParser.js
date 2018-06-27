export default () => (req, res, next) => {
	const requestCookies = req.headers.cookie;

	if (requestCookies) {
		const cookies = {};
		requestCookies.split(";").forEach(cookie => {
			const [key, value] = cookie.split("=");
			cookies[key.trim()] = decodeURI(value);
		});

		req.cookies = cookies;
	}

	next();
};
