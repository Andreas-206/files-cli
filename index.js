import { program } from 'commander';
import { createFile, getFiles, getFileInfo } from './files.js';

program
    .option('-a, --action <type>', 'choose action')
    .option('-f, --fileName <type>', 'name File')
    .option('-c, --content <type>', 'content');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, fileName, content }) {
    switch (action) {
        case 'create':
            createFile(fileName, content);
            break;

        case 'getFiles':
            getFiles();
            break;

        case 'getFileInfo':
            getFileInfo(fileName);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(options);
