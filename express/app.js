import express from "express";

import applyPassportStrategies from "./strategies";

import cookieParser from "./middlewares/cookieParser";
import queryParser from "./middlewares/queryParser";

import router from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(queryParser());

applyPassportStrategies(app);

app.use("/api", router);

export default app;
