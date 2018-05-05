import fs from "fs";
import path from "path";
import crypto from "crypto";

export default class DirWatcher {
	constructor({ emitter }) {
		this.emitter = emitter;
		this._files = [];
	}

	emit(eventName, ...attrs) {
		this.emitter.emit(`dirwatcher:${eventName}`, ...attrs);
	}

	getFileHash(filePath) {
		try {
			const fileContent = fs.readFileSync(filePath);

			return crypto
				.createHash("sha1")
				.update(fileContent)
				.digest("hex");
		} catch (err) {
			console.log(err);

			return null;
		}
	}

	addFile(path) {
		const hash = this.getFileHash(path);

		this._files.push({ path, hash });
		this.emit("added", path);
	}

	updateFile(index, newHash) {
		const currentFile = this._files[index];

		currentFile.hash = newHash;
		this.emit("changed", currentFile.path);
	}

	deleteFile(index) {
		const { path } = this._files[index];

		this._files.splice(index, 1);
		this.emit("deleted", path);
	}

	watch(dirPath, delay) {
		setInterval(() => {
			fs.readdir(dirPath, (error, currentFilesNames) => {
				if (error) {
					return console.log(error);
				}

				const currentFilesList = currentFilesNames.map(fileName =>
					path.resolve(dirPath, fileName)
				);

				currentFilesList.forEach(filePath => {
					const fileHash = this.getFileHash(filePath);
					const index = this._files.findIndex(
						file => file.path === filePath
					);

					if (!fileHash) return;

					if (index === -1) {
						this.addFile(filePath, fileHash);
					} else {
						const currentFile = this._files[index];

						if (currentFile.hash !== fileHash) {
							this.updateFile(index, fileHash);
						}
					}
				});

				this._files.forEach((file, fileIndex) => {
					const findedIndex = currentFilesList.findIndex(
						path => file.path === path
					);

					if (findedIndex === -1) {
						this.deleteFile(fileIndex);
					}
				});
			});
		}, delay);
	}
}
