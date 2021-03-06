import "babel-register";
import mongoose from "mongoose";

import User from "./models/mongo/user";
import Product from "./models/mongo/product";
import City from "./models/mongo/city";

import app from "./app";

const products = require("./data/products.json");
const users = require("./data/users.json");
const cities = require("./data/cities.json");

const port = process.env.PORT || 8080;
let id = 0;

mongoose
	.connect(
		`mongodb://localhost:27017/local`,
		{ useNewUrlParser: true }
	)
	.then(() => app.listen(port))
	.then(() => console.log(`App listening on port ${port}!`))
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});
