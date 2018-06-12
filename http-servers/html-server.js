const http = require("http");
const fs = require("fs");

http.createServer()
	.on("request", (req, res) => {
		res.setHeader("Content-Type", "text/html");

		try {
			const data = fs.readFileSync("./index.html");

			res.statusCode = 200;
			res.end(data.toString().replace("{message}", "Hello world!"));
		} catch (err) {
			res.statusCode = 500;
			res.end("Something went wrong");
		}
	})
	.listen(9000);
