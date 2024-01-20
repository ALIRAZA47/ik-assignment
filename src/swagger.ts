import swaggerAutogen from 'swagger-autogen'
import { config } from 'dotenv'
import j2s from 'joi-to-swagger'
import { ScrapUsingUrlsValidator } from './validators/scrap.using.urls.validator'

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
        URLToContentsModel: SwaggerDefinitionsFromJoi(ScrapUsingUrlsValidator),
    },
}

const outputFile = '../swagger.json'
const endpointsFiles = ['src/controllers/index.controller.ts']

// _swaggerAutogen(outputFile, endpointsFiles, swaggerConfigDoc)
