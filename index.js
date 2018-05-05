import "babel-register";
import EventEmitter from "events";

import appConfig from "./config";
import DirWatcher from "./modules/dirwatcher";
import Importer from "./modules/importer";

console.log(appConfig.name);

const emitter = new EventEmitter();
const watcher = new DirWatcher({ emitter });
const myImporter = new Importer();

watcher.watch("./data", 1000);

emitter.on("dirwatcher:changed", fileName => {
	myImporter
		.import(fileName)
		.then(console.log)
		.catch(console.error);
});
