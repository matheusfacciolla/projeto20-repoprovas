import chalk from "chalk";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({ path: ".env" });

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Server is up and running on port ${port}`));
})