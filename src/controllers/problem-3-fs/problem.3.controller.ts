import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { HttpStatusCode } from 'axios'
import { Problem2Service } from '../../services/problem-2/problem.2.service'
import { Problem3FsService } from '../../services/problem-3/problem.3.fs.service'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import validateRequestQuery from '../../middlewares/validate.request.query'
import { ReadFilesWithExtensionApiDto } from '../../dtos/read.files.with.extension.api.dto'

const problem3FsRouter = Router()

const problem3Service = new Problem3FsService()
// router functions
problem3FsRouter.get(
    '/read-files',
    validateRequestQuery(ReadFilesWithExtensionApiDto),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 3 (File System)']
    // #swagger.summary = 'Read files from the directory with extension provided in the query params'
    /* #swagger.parameters['extension'] = {
                                        in: 'query',
                                        description: 'Extension of the file to read',
                                        required: true,
                                        example: '.txt',
                                        type: 'string',
                                } */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'File Contents',
            await problem3Service.readFiles(req.query.extension as string),
        )
    }),
)

export { problem3FsRouter }
