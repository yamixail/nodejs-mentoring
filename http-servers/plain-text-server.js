const http = require("http");

http.createServer()
	.on("request", (req, res) => {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end("Hello world!");
	})
	.listen(9000);
