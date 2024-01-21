import { isValidObjectId } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import HttpException from '../utils/global/httpException'
import { BAD_REQUEST } from '../common/constants/statusCodes'

const validateObjectIdMw =
  (paramName?: string) =>
      (req: Request, res: Response, next: NextFunction): void => {
          if (!isValidObjectId(paramName ? req.params[paramName] : req.params.id)) {
              throw new HttpException(BAD_REQUEST, 'Provided Id is not valid')
          }
          next()
      }

export default validateObjectIdMw
