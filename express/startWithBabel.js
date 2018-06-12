require("babel-core").transformFile("./index.js", (err, result) => {
	if (err) {
		return console.error(err);
	}

	eval(result.code);
});
