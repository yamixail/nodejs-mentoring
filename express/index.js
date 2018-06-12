import "babel-register";

import app from "./app";

import cookieParser from "./middlewares/cookieParser";
import queryParser from "./middlewares/queryParser";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(cookieParser());
app.use(queryParser());

app.get("/", (req, res) => {
	res.json({
		cookies: req.cookies,
		queries: req.parsedQuery
	});

	res.end();
});
