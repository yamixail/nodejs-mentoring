import "babel-register";

import appConfig from "./config/app";
import { Product, User } from "./models";

console.log(appConfig.name);

new User();
new Product();
