import "babel-register";

import db from "./models";

import app from "./app";
import router from "./routes";

const port = process.env.PORT || 8080;

db.sequelize
	.sync()
	.then(() => app.listen(port))
	.then(() => console.log(`App listening on port ${port}!`))
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

app.use("/api", router);
