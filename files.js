import path from 'node:path';
import fs from 'node:fs/promises';
import chalk from 'chalk';
import validateData from './utils/validateData.js';
import { checkExtention } from './utils/checkExtention.js';
import { readFile } from 'node:fs';

const dirPath = path.resolve('files');

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
    const pathNewFile = path.resolve('files', fileName);
    try {
        await fs.writeFile(pathNewFile, content, 'utf-8');
        console.log(chalk.green('File is created successfuly'));
    } catch (error) {
        console.log(error);
    }
}

export async function getFiles() {
    const dir = await fs.readdir(dirPath);

    if (dir.length === 0) {
        console.log(chalk.red('There are no files at directory!'));
        return;
    }

    dir.forEach((file) => console.log(file));
}

export async function getFileInfo(fileName) {
    const dir = await fs.readdir(dirPath);

    if (!dir.includes(fileName)) {
        console.log(chalk.red(`There is no file!`));
        return;
    }

    const filePath = path.resolve(dirPath, fileName);
    const data = await fs.readFile(filePath, 'utf-8');

    const fileInfo = {
        content: data,
        // name  (module path)
        // extension (module path)
        //createdAt (module fs)
    };
    console.log(fileInfo);
}
