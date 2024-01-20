import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'

const scrapRouter = Router()

const scrappingService = new ScrappingService()
// router functions
scrapRouter.post(
    '/',
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Scrapping']
    //  #swagger.description = 'APIs for scrapping.'
    /* #swagger.responses[200] = {
                                     data: 'App Home.',
                                 } */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'App Home',
            await scrappingService.scrap(),
        )
    }),
)

export { scrapRouter }
