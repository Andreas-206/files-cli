import path from 'node:path'
import fs from 'node:fs/promises'
import chalk from 'chalk'
import validateData from './utils/validateData.js'

export async function createFile(fileName, content) {
	const file = {
		fileName,
		content,
	}
	const { error } = validateData(file)
	if (error) {
		const errorDetails = error.details[0].path[0]
		console.log(chalk.red(`Please specify ${errorDetails} parameter.`))
	}
}
