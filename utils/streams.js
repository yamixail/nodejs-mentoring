const program = require("commander");
const through = require("through2");
const fs = require("fs");
const path = require("path");
const util = require("util");

const Importer = require("../modules/importer").default;
const myImporter = new Importer({});

const breakIfDoesntExist = filePath => {
	if (!fs.existsSync(filePath)) {
		console.error(`File ${options.file} doesn't exist`);
		process.exit();
	}
};

const actions = [
	{
		name: "reverse",
		run: () => {
			process.stdin.setEncoding("utf8");

			process.stdin.on("readable", () => {
				var chunk = process.stdin.read();
				if (chunk !== null) {
					const str = chunk.toString().trim();

					if (str === "exit") {
						process.stdin.end(null);
						process.exit();
					}

					let result = "";
					let i = str.length;

					while (i--) {
						result += str[i];
					}

					process.stdout.write(`Result: ${result}\n\n`);
				}
			});
		}
	},
	{
		name: "transform",
		run: () => {
			const processing = through(write, end);

			process.stdin.pipe(processing).pipe(process.stdout);

			function write(buffer, encoding, next) {
				const str = buffer.toString().trim();

				if (!str || str === "exit") {
					this.push(null);
					process.exit();
				}

				next(null, `Result: ${str.toUpperCase()}\n\n`);
			}

			function end(done) {
				done();
			}
		}
	},
	{
		name: "outputFile",
		run: options => {
			if (!options.file) {
				console.error(
					"Option 'file' is required for 'outputFile' action"
				);
				process.exit();
			}

			breakIfDoesntExist(options.file);
			fs.createReadStream(options.file).pipe(process.stdout);
		}
	},
	{
		name: "convertFromFile",
		run: options => {
			if (!options.file) {
				console.error(
					"Option 'file' is required for 'convertFromFile' action"
				);
				process.exit();
			}

			breakIfDoesntExist(options.file);

			let result = "";
			const write = (buffer, encoding, next) => {
				result += buffer.toString();
				next();
			};
			const end = done => done();
			const processing = through(write, end);

			fs
				.createReadStream(options.file)
				.pipe(processing)
				.on("finish", () => {
					const str = JSON.stringify(myImporter.parseCsv(result));
					process.stdout.write(str);
				});
		}
	},
	{
		name: "convertToFile",
		run: options => {
			if (!options.file) {
				console.error(
					"Option 'file' is required for 'convertToFile' action"
				);
				process.exit();
			}

			const filePath = path.resolve(options.file);
			const fileExt = path.extname(filePath);

			breakIfDoesntExist(filePath);

			if (fileExt !== ".csv") {
				console.error(`File extension should be only CSV`);
				process.exit();
			}

			let result = "";
			const write = (buffer, encoding, next) => {
				result += buffer.toString();
				next();
			};
			const end = done => done();
			const processing = through(write, end);

			fs
				.createReadStream(filePath)
				.pipe(processing)
				.on("finish", () => {
					const dirName = path.dirname(filePath);
					const fileName = path.basename(filePath, fileExt);
					const jsonFilePath = path.resolve(
						dirName,
						`${fileName}.json`
					);

					try {
						fs
							.createWriteStream(jsonFilePath)
							.end(JSON.stringify(myImporter.parseCsv(result)));

						console.log("done");
					} catch (e) {
						console.error(e);
					}
				});
		},
	},
	{
		name: "bundler",
		run: options => {
			if (!options.path) {
				console.error(
					"Option 'path' is required for 'bundler' action"
				);
				process.exit();
			}

			const dirPath = path.resolve(options.path);

			if (!fs.existsSync(dirPath)) {
				console.error(`Path ${options.path} doesn't exist`);
				process.exit();
			}

			const bundleFilePath = path.resolve(dirPath, 'bundle.css');

			if (fs.existsSync(bundleFilePath)) {
				fs.unlinkSync(bundleFilePath);
			}

			readDir = util.promisify(fs.readdir);
			const bundleStream = fs.createWriteStream(bundleFilePath);

			readDir(dirPath)
				.then(currentFilesNames => {
					const cssFilesList = currentFilesNames
						.map(fileName =>
							path.resolve(dirPath, fileName)
						)
						.filter(filePath => path.extname(filePath) === '.css');

					cssFilesList.forEach(filePath => {
						fs.createReadStream(filePath).pipe(bundleStream);
					});

					bundleStream.on("finish", () => {
						bundleStream.end(null);
						console.log('Bundle successfully created.');
					});
				})
				.catch(console.error);
		}
	}
];

// Workaround for commander module
const defaultCommanderAction = program.action;

program.errorHandler = function(message) {
	console.log();
	console.error("  " + message);
	this.help();
};

program.optionMissingArgument = function(option, flag) {
	if (flag) {
		this.errorHandler(
			`error: option '${option.flags}' argument missing, got '${flag}'`
		);
	} else {
		this.errorHandler(`error: option '${option.flags}' argument missing`);
	}
};

program
	.version("0.0.1")
	.option(
		"-a, --action <actionName>",
		`possible actions one of [${actions
			.map(action => action.name)
			.join(", ")}]`
	)
	.option("-f, --file <fileName>", "optional path to file for some actions")
	.option("-p, --path <dirPath>", "optional parameter path only for bundler")
	.parse(process.argv);

const actionOption = program.options.find(option => option.long === `--action`);

if (program.action === defaultCommanderAction) {
	program.errorHandler("Option 'action' is required");
} else {
	const currentAction = actions.find(
		action => action.name === program.action
	);

	if (!currentAction) {
		program.errorHandler(
			`Option 'action' should be one of [${actions
				.map(action => action.name)
				.join(", ")}]`
		);
	}

	currentAction.run(program.opts());
}
