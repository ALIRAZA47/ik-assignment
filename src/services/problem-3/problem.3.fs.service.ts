import * as fs from 'fs'
import * as path from 'path'
import mkdirp from 'mkdirp'
import * as process from 'process'
import HttpException from '../../utils/global/httpException'
import { HttpStatusCode } from 'axios'
import { execSync } from 'child_process'

export class Problem3FsService {
    constructor() {
    // nothing
    }

    async readFiles(extension: string) {
        try {
            let filesListInDir = [] as fs.Dirent[]
            try {
                filesListInDir = fs.readdirSync(process.cwd() + '/files', {
                    withFileTypes: true,
                })
            } catch (e) {
                mkdirp.sync(process.cwd() + '/files')
            }
            const filesWithExtension = filesListInDir.filter((file) =>
                file.name.endsWith(extension),
            )
            if (filesWithExtension && filesWithExtension.length) {
                const filesContent = filesWithExtension.map((file) => {
                    try {
                        const fileContent = fs.readFileSync(
                            path.join(process.cwd(), 'files', file.name),
                            'utf8',
                        )
                        return {
                            fileName: file.name,
                            success: true,
                            fileContent,
                        }
                    } catch (e) {
                        return {
                            fileName: file.name,
                            success: false,
                            fileContent: null,
                            reasonOfFailure: e?.message || 'Error reading file',
                        }
                    }
                })
                return filesContent
            } else {
                throw new HttpException(
                    HttpStatusCode.NotFound,
                    'No files found with the extension provided',
                )
            }
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message ||
          'Error reading files. Please check if the files directory exists.',
            )
        }
    }
}
