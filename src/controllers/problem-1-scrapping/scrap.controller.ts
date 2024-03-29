import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { ScrapUsingUrlsDto } from '../../dtos/scrap.using.urls.dto'

const scrapRouter = Router()

const scrappingService = new ScrappingService()
// router functions
scrapRouter.post(
    '/scrap',
    validateRequestBody(ScrapUsingUrlsDto),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 1 (Scrapping)']
    //  #swagger.description = 'Note: Request to the URLs provided will get timed out after 30 seconds.'
    // #swagger.summary = 'Get Contents of a URL using Puppeteer.'
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
            'Scrapped Contents',
            await scrappingService.scrap(req.body?.urls as string[]),
        )
    }),
)

export { scrapRouter }
