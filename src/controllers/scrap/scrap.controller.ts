import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { ScrapUsingUrlsValidator } from '../../validators/scrap.using.urls.validator'

const scrapRouter = Router()

const scrappingService = new ScrappingService()
// router functions
scrapRouter.post(
    '/',
    validateRequestBody(ScrapUsingUrlsValidator),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Scrapping']
    //  #swagger.description = 'API to scrap data from a using URL.'
    /*  #swagger.requestBody = {
                     required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/URLToContentsModel',
                                },
                            },
                        },
                   }
               */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'App Home',
            await scrappingService.scrap(req.body?.urls as string[]),
        )
    }),
)

export { scrapRouter }
