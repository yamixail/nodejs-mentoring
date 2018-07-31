import "babel-register";
import express from "express";

import db from "./models";

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

db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

app.use("/api", router);
