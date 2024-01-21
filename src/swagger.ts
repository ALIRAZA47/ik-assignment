import swaggerAutogen from 'swagger-autogen'
import { config } from 'dotenv'
import j2s from 'joi-to-swagger'
import { ScrapUsingUrlsDto } from './dtos/scrap.using.urls.dto'
import { CreatePostJoiSchema } from './dtos/posts/create.post.dto'

config()

export const SwaggerDefinitionsFromJoi = (joiSchema: any) => {
    return j2s(joiSchema).swagger
}
export const swaggerConfigDoc = {
    swagger: '1.0',
    info: {
        version: '1.0.0',
        title: 'REST API',
        description: '',
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    basePath: '/api',
    schemes: ['http'],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
    '@definitions': {
        URLToContentsModel: SwaggerDefinitionsFromJoi(ScrapUsingUrlsDto),
        CreatePostModel: SwaggerDefinitionsFromJoi(CreatePostJoiSchema),
    },
}

const outputFile = '../swagger.json'
const endpointsFiles = ['src/controllers/index.controller.ts']

// _swaggerAutogen(outputFile, endpointsFiles, swaggerConfigDoc)
