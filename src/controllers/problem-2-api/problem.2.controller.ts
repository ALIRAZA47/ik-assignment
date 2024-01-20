import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { ScrapUsingUrlsValidator } from '../../validators/scrap.using.urls.validator'
import { Problem2Service } from '../../services/problem-2/problem.2.service'

const problem2Api = Router()

const problem2Service = new Problem2Service()
// router functions
problem2Api.get(
    '/call-api',
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 2 (API Call)']
    // #swagger.summary = 'Call an API and return the response (API Call). Handle the error if the API call fails.'
    /*  #swagger.requestBody = {
                                                     required: true,
                                                        content: {
                                                            'application/json': {
                                                            },
                                                        },
                                                   }
                                               */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'App Home',
            await problem2Service.callApiHandleExceptionsAndReturnResponse(),
        )
    }),
)

export { problem2Api }
