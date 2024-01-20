import swaggerAutogen from 'swagger-autogen'
import { swaggerConfigDoc } from './swagger'

const outputFile = '../swagger.json'
const endpointsFiles = ['src/controllers/index.controller.ts']
const _swaggerAutogen = swaggerAutogen()

_swaggerAutogen(outputFile, endpointsFiles, swaggerConfigDoc).then(() => {
    console.log('Swagger docs generated. Starting server...')
    require('./app.ts') // Your project's root file
})
