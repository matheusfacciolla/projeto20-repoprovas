import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import "express-async-errors";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import router from "./routers/index.js";
//import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
//app.use(handleErrorsMiddleware);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Server is up and running on port ${port}`));
})