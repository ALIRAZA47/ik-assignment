import swaggerAutogen from 'swagger-autogen'
import { config } from 'dotenv'

config()

const _swaggerAutogen = swaggerAutogen()
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
}

const outputFile = '../swagger.json'
const endpointsFiles = ['src/controllers/index.controller.ts']

// _swaggerAutogen(outputFile, endpointsFiles, swaggerConfigDoc)
