const net = require("net");
const server = net.createServer();

server.listen(9000);
server.on("listening", () => {
	console.log("server accepting connections");
});

server.on("connection", socket => {
	console.log("client connected");
	socket.write("Hello client!\n");

	socket.on("data", data => {
		console.log(data.toString());
	});

	socket.pipe(socket);
});
