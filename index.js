import "babel-register";

import appConfig from "./config";
import { Product, User } from "./models";

console.log(appConfig.name);

new User();
new Product();
