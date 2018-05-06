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

	getFileMTime(filePath) {
		try {
			return +fs.statSync(filePath).mtime;
		} catch (err) {
			console.log(err);

			return null;
		}
	}

	addFile(path, mTime) {
		this._files.push({ path, mTime });
		this.emit("added", path);
	}

	updateFile(index, newMTime) {
		const currentFile = this._files[index];

		currentFile.mTime = newMTime;
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
					const fileMTime = this.getFileMTime(filePath);
					const index = this._files.findIndex(
						file => file.path === filePath
					);

					if (!fileMTime) return;

					if (index === -1) {
						this.addFile(filePath, fileMTime);
					} else {
						const currentFile = this._files[index];

						if (currentFile.mTime !== fileMTime) {
							this.updateFile(index, fileMTime);
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
