import "babel-register";
import EventEmitter from "events";

import appConfig from "./config";
import DirWatcher from "./modules/dirwatcher";
import Importer from "./modules/importer";

console.log(appConfig.name);

const emitter = new EventEmitter();
const watcher = new DirWatcher({ emitter });

new Importer({ emitter }).listen(console.log, console.error);

watcher.watch("./data", 1000);


