import path from "node:path";
import fs from "node:fs/promises";
import chalk from "chalk";
import validateData from "./utils/validateData.js";
import { checkExtention } from "./utils/checkExtention.js";

export async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };
  const { error } = validateData(file);
  if (error) {
    const errorDetails = error.details[0].path[0];
    console.log(chalk.red(`Please specify ${errorDetails} parameter.`));
  }

  const { extention, check } = checkExtention(fileName);

  if (!check) {
    console.log(
      chalk.red(`Sorry APP doesn't  support with ${extention} extention.`)
    );
  }
  const pathNewFile = path.resolve("files", fileName);
  try {
    await fs.writeFile(pathNewFile, content, "utf-8");
    console.log(chalk.green("File is created successfuly"));
  } catch (error) {
    console.log(error);
  }
}
