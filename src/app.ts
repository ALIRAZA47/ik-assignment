// formatter: off
// prettier-ignore
require('dotenv').config() // Load environment variables from .env file
// formatter: on
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/database'
import api from './controllers/index.controller'
import { errorHandler, notFound } from './middlewares/exception.handler.mw'
import authenticationMiddleware from './middlewares/authentication.mw'
import swaggerUI from 'swagger-ui-express'

const app = express()
// Setup Mongo
connectDB()
mongoose.connection.once('open', () => {
    // All OK - fire (emit) a ready event.
    app.emit('ready')
})

// setup morgan for req logging
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
// Controllers
app.get('/', (req, res) => {
    // redirect to swagger docs
    res.redirect('/api-docs')
})
app.get('', (req, res) => {
    // redirect to swagger docs
    res.redirect('/api-docs')
})
app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(require('../swagger.json')),
)
app.use('/api/', api)
// Middlewares
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
// set vars
app.set('port', port)
app.set('env', process.env.APP_ENV)
app.set('host', process.env.APP_HOST)

// Start the server

app.listen(port, () => {
    console.log(
        `Server Listening @: ${process.env.PROTOCOL}://${process.env.HOST}`,
    )
})

export default app
