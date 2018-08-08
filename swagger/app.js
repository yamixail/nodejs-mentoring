"use strict";

const mongoose = require("mongoose");
var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
module.exports = app; // for testing

var config = {
	appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) {
		throw err;
	}

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;

	mongoose
		.connect(
			`mongodb://localhost:27017/local`,
			{ useNewUrlParser: true }
		)
		.then(() => app.listen(port))
		.catch(console.error);
});
