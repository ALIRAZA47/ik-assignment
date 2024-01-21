import swaggerAutogen from 'swagger-autogen'
import { swaggerConfigDoc } from './swagger'

const outputFile = '../swagger.json'
const endpointsFiles = ['src/controllers/index.controller.ts']
const _swaggerAutogen = swaggerAutogen({ openapi: '3.0.0' })

_swaggerAutogen(outputFile, endpointsFiles, swaggerConfigDoc).then(() => {
    console.log(
        'Swagger docs generated. Goto \'/api-docs\' to view docs Starting server...',
    )
    require('./app') // Your project's root file
})
