const path = require("path");

require("babel-core").transformFile(
	path.resolve(__dirname, "./index.js"),
	(err, result) => {
		if (err) {
			return console.error(err);
		}

		eval(result.code);
	}
);
