import { Router } from 'express'
import asyncHandler from '../../utils/router.methods'
import globalResponseHandler from '../../utils/global/response.handler'
import { ScrappingService } from '../../services/scrapping/scrapping.service'
import { HttpStatusCode } from 'axios'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import { ScrapUsingUrlsDto } from '../../dtos/scrap.using.urls.dto'
import { Problem2Service } from '../../services/problem-2/problem.2.service'
import { Problem4PostsCrud } from '../../services/problem-4/problem.4.posts.crud'
import {
    CreatePostDto,
    CreatePostJoiSchema,
} from '../../dtos/posts/create.post.dto'
import validateObjectIdMw from '../../middlewares/validate.object.id.mw'

const problem4Router = Router()

const problem4Service = new Problem4PostsCrud()
// router functions
problem4Router.get(
    '/',
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 4 (Posts CRUD)']
    // #swagger.summary = 'Read All Posts'
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'All Posts',
            await problem4Service.readAll(),
        )
    }),
)
// get post by id
problem4Router.get(
    '/:post_id',
    validateObjectIdMw('post_id'),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 4 (Posts CRUD)']
    // #swagger.summary = 'Read Posts By ID'
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'Post By ID',
            await problem4Service.readById(req.params.post_id),
        )
    }),
)
// create post
problem4Router.post(
    '/',
    validateRequestBody(CreatePostJoiSchema),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 4 (Posts CRUD)']
    // #swagger.summary = 'Create New Post'
    /*  #swagger.requestBody = {
                                                                 required: true,
                                                                    content: {
                                                                        'application/json': {
                                                                            schema: {
                                                                                $ref: '#/definitions/CreatePostModel'
                                                                            },
                                                                        },
                                                                    },
                                                               }
                                                           */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Created,
            'Create Posts',
            await problem4Service.create(req.body as CreatePostDto),
        )
    }),
)
// update post
problem4Router.patch(
    '/:post_id',
    validateObjectIdMw('post_id'),
    validateRequestBody(CreatePostJoiSchema),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 4 (Posts CRUD)']
    // #swagger.summary = 'Update Post'
    /*  #swagger.requestBody = {
                                                                required: true,
                                                                    content: {
                                                                        'application/json': {
                                                                            schema: {
                                                                                $ref: '#/definitions/CreatePostModel'
                                                                            },
                                                                        },
                                                                    },
                                                            }   
                     */
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.Ok,
            'Update Posts',
            await problem4Service.update(
        req.params.post_id as string,
        req.body as CreatePostDto,
            ),
        )
    }),
)
// delete post
problem4Router.delete(
    '/:post_id',
    validateObjectIdMw('post_id'),
    asyncHandler(async (req, res) => {
    // #swagger.tags = ['Problem 4 (Posts CRUD)']
    // #swagger.summary = 'Delete Post'
        return globalResponseHandler(
            req,
            res,
            HttpStatusCode.NoContent,
            'Create Posts',
            await problem4Service.delete(req.params.post_id as string),
        )
    }),
)

export { problem4Router }
