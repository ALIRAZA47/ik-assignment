import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { ScrapUsingUrlsDto } from '../../dtos/scrap.using.urls.dto'
import { Problem2Service } from '../../services/problem-2/problem.2.service'

const problem2Api = Router()

const problem2Service = new Problem2Service()
// router functions
problem2Api.get(
    '/call-api',
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 2 (API Call)']
    // #swagger.summary = 'Call an API and return the response (API Call). Handle the error if the API call fails.'
    // #swagger.description = 'I will be using the API https://jsonplaceholder.typicode.com/todos/1000 to get the todo. If the API call fails, I will handle the error and return the error message and the status code.'
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'API Call',
            await problem2Service.callApiHandleExceptionsAndReturnResponse(),
        )
    }),
)

export { problem2Api }
