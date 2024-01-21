import HttpException from '../utils/global/httpException'
import { isEmpty } from '../utils/object.methods'
import joiValidateOptions from '../common/constants/validations/joi'
import { BAD_REQUEST } from 'http-status'
import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

const validateRequestQuery = <T>(schema: Joi.ObjectSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (isEmpty(req.query)) {
            throw new HttpException(BAD_REQUEST, 'Query params cannot be empty')
        } else {
            const { error } = schema.validate(req.query, joiValidateOptions)
            const valid = error == null

            if (valid) {
                next()
            } else {
                const { details } = error
                // push all the errors into an array
                const message = []
                details.forEach((err) => {
                    message.push({
                        errMessage: err.message,
                        errDetails: {
                            key: err.context.key,
                            label: err.context.label,
                            path: err.path,
                        },
                    })
                })
                throw new HttpException(BAD_REQUEST, message)
            }
        }
    }
}
export default validateRequestQuery
