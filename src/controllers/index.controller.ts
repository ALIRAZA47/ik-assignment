import { Router } from 'express'
import globalResponseHandler from '../utils/global/response.handler'
import HomeService from '../services'
import { OK } from 'http-status'
import asyncHandler from '../utils/router.methods'
import { ActuatorHealth } from '../../health/actuator.health'
import { scrapRouter } from './problem-1-scrapping/scrap.controller'
import { problem2Api } from './problem-2-api/problem.2.controller'
import { problem3FsRouter } from './problem-3-fs/problem.3.controller'
import { problem4Router } from './problem-4-posts/problem.4.controller'
import authenticationMiddleware from '../middlewares/authentication.mw'
import { userRouter } from './user/user.controller'

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
rootRouter.use('/problem-1-scrapping', scrapRouter)
rootRouter.use('/problem-2-api', problem2Api)
rootRouter.use('/problem-3-fs', problem3FsRouter)
rootRouter.use('/problem-4-posts-crud', problem4Router)

// authed routes
rootRouter.use('/users', authenticationMiddleware, userRouter)

export default rootRouter
