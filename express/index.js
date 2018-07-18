import "babel-register";
import express from "express";

import app from "./app";
import router from "./routes";
import applyPassportStrategies from "./strategies";

import cookieParser from "./middlewares/cookieParser";
import queryParser from "./middlewares/queryParser";

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(queryParser());

applyPassportStrategies(app);

app.get("/", (req, res) => {
	res.json({
		cookies: req.cookies,
		queries: req.parsedQuery
	});
});

app.use("/api", router);
