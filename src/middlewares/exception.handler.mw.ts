import globalResponseHandler from '../utils/global/response.handler'
import { OK } from '../common/constants/statusCodes'
import { Logger } from '../utils/logger'
import * as HttpStatus from 'http-status'

export function notFound(req, res) {
    res.status(404)
    throw Error(`Cannot ${req.method} ${req.url}`)
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
    if (process.env.APP_ENV !== 'test') {
        let msg = err.message
        try {
            msg = JSON.stringify(err.message)
        } catch (e) {
            //
        }
        Logger.error(`Exception handled with error message: '${msg}'`)
    }
    const statusCode = err.statusCode
        ? err.statusCode
        : res.statusCode !== OK
            ? res.statusCode
            : 500
    globalResponseHandler(
        req,
        res,
        statusCode,
        HttpStatus?.[`${statusCode}_NAME`] || 'Something went wrong!',
        null,
        Array.isArray(err.message) ? err.message : [err.message],
    )
}
