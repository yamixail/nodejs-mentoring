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

		const keys = data[0].split(",").map(val => val.trim());
		const result = [];

		for (let i = 1; i < data.length; i++) {
			const str = data[i].split(",");
			const item = {};

			for (let j in str) {
				if (!str[j]) continue;

				item[keys[j]] = str[j];
			}

			result.push(item);
		}

		return result;
	}
}
