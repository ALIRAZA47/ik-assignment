import HttpException from '../utils/global/httpException'
import { NextFunction, Request, Response } from 'express'
import { FORBIDDEN } from '../common/constants/statusCodes'

import { authMiddleware } from '../common/constants/ExcludedRoutes.json'
import { JwtService } from '../services/jwt.service'

const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const excludedRoutes: string[] = authMiddleware[req.method]
    const reqUrl = req.originalUrl
    if (
        excludedRoutes &&
    excludedRoutes.length &&
    (excludedRoutes.includes(reqUrl) ||
      excludedRoutes.includes(reqUrl.split('?')[0]))
    ) {
        return next()
    } else {
        try {
            console.log('req.header', req.header('Authorization'))
            const token = req.header('Authorization')?.replace('Bearer ', '')
            if (!token)
                return next(new HttpException(FORBIDDEN, 'Auth token is required!'))
            const jwtService = new JwtService()
            const decodedToken = jwtService.verify(token)
            if (decodedToken) {
                req['user'] = decodedToken
                next()
            } else {
                return next(new HttpException(FORBIDDEN, 'Invalid access/id token'))
            }
        } catch (error) {
            return next(new HttpException(FORBIDDEN, 'Invalid or expired token!'))
        }
    }
}

export default authenticationMiddleware
