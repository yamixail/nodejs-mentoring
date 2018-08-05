const db = require("../models");

const products = require("../data/products.json");
const users = require("../data/users.json");

db.sequelize
	.sync()
	.then(() =>
		Promise.all(
			users
				.map(user =>
					db.User.create(user)
						.then(item => console.log(item.toJSON()))
						.catch(console.error)
				)
				.concat(
					...products.map(product =>
						db.Product.create(product)
							.then(item => console.log(item.toJSON()))
							.catch(console.error)
					)
				)
		)
	)
	.then(() => console.log("all data successfully imorted"))
	.catch(() => console.log("something went wrong"))
	.then(() => {
		process.exit(1);
	});
