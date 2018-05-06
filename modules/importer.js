import fs from "fs";

export default class Importer {
	import(filePath) {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (err, buffer) => {
				if (err) return reject(err);

				return resolve(this.parseCsv(buffer));
			});
		});
	}

	importSync(filePath) {
		try {
			const buffer = fs.readFileSync(filePath);

			return this.parseCsv(buffer);
		} catch (err) {
			console.log(err);
		}
	}

	parseCsv(buffer) {
		let data = buffer.toString().split(/\r\n|\r|\n/);

		while (!data[data.length - 1]) data.pop();

		data = data.map(string => string.split(","));
		const keys = data.shift();
		const result = [];

		for (let str of data) {
			const item = {};

			for (let i in str) {
				item[keys[i]] = str[i];
			}

			result.push(item);
		}

		return result;
	}
}
