import express from "express";

import applyPassportStrategies from "./strategies";

import cookieParser from "./middlewares/cookieParser";
import queryParser from "./middlewares/queryParser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(queryParser());

applyPassportStrategies(app);

export default app;
