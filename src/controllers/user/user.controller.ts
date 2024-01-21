import express from 'express'
import globalResponseHandler from '../../utils/global/response.handler'
import asyncHandler from '../../utils/router.methods'
import { UserService } from '../../services/user/user.service'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { SignupUserJoiSchema } from '../../dtos/users/create.user.dto'
import { OK } from 'http-status'
import { Types } from '../../types/types'
import { LoginUserJoiSchema } from '../../dtos/users/login.user.dto'
import { HttpStatusCode } from 'axios'

// vars
const userRouter = express.Router()
const userService = new UserService()
// routes
userRouter.get(
    '/me',
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]s
    // #swagger.summary = 'Get current user details. Returns user details if token is valid in Authorization header.'
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'User',
            await userService.getCurrentUserDetails(req),
        )
    }),
)
userRouter.post(
    '/signup',
    validateRequestBody(SignupUserJoiSchema),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['User']
    /* #swagger.requestBody = {
                                                                                required: true,
                                                                                content: {
                                                                                     "application/json": {
                                                                                          schema: {
                                                                                            $ref: "#/definitions/SignupUserModel"
                                                                                          }
                                                                                     }
                                                                                }
                                                                              }
                                                                         */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Created,
            'User Created',
            await userService.createUser(req.body as Types.User.SignupDto),
        )
    }),
)

userRouter.post(
    '/login',
    validateRequestBody(LoginUserJoiSchema),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['User']
    /* #swagger.requestBody = {
                                                                        required: true,
                                                                        content: {
                                                                             "application/json": {
                                                                                  schema: {
                                                                                    $ref: "#/definitions/LoginUserModel"
                                                                                  }
                                                                             }
                                                                        }
                                                                      }
                                                                 */
        return globalResponseHandler(
            req,
            res,
            OK,
            'User Token',
            await userService.login(req.body as Types.User.LoginDto),
        )
    }),
)

export { userRouter }
