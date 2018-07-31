import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

import { postgres as config } from "./config.json";

const db = {};
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);
const modelsPath = path.resolve("../models");

fs.readdirSync(modelsPath)
	.filter(file => {
		return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
	})
	.forEach(file => {
		const model = sequelize["import"](path.join(modelsPath, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
