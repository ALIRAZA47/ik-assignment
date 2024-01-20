import { Router } from 'express'
import globalResponseHandler from '../utils/global/response.handler'
import HomeService from '../services'
import userRouter from './user/user.controller'
import { HttpStatus, OK } from 'http-status'
import asyncHandler from '../utils/router.methods'
import { ActuatorHealth } from '../../health/actuator.health'
import { scrapRouter } from './scrap/scrap.controller'

const rootRouter = Router({ mergeParams: true })

const homeService = new HomeService()
// router functions
rootRouter.get(
    '/',
    asyncHandler(async (req, res) => {
    /*
                                    #swagger.tags = ['App']
                                #swagger.description = 'App Home.'
                        
                                    #swagger.responses[200] = {
                                        data: 'App Home.',
                                    }
                                    */
        return globalResponseHandler(
            req,
            res,
            OK,
            'App Home',
            await homeService.appHome(),
        )
    }),
)

rootRouter.use(ActuatorHealth)
rootRouter.use('/users', userRouter)
rootRouter.use('/scrap', scrapRouter)

export default rootRouter
