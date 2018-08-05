const MongoClient = require("mongodb").MongoClient;
const http = require("http");

MongoClient.connect(
	"mongodb://localhost:27017/",
	function(err, db) {
		if (!err) {
			console.log("Connected correctly to server");

			http.createServer(function(req, res) {
				db.db("local")
					.collection("cities")
					.aggregate([{ $sample: { size: 1 } }])
					.toArray((err, [city]) => {
						if (err) {
							res.end(err.message);

							return console.log(err);
						}

						res.end(JSON.stringify(city));
					});
			}).listen(8080);
		}
	}
);
