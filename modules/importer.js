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
		const data = buffer.toString().split(/\r\n|\r|\n/);

		while (!data[data.length - 1]) data.pop();

		return data.map(string => string.split(","));
	}
}
