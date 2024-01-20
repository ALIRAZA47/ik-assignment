import { UserRecord } from 'firebase-admin/lib/auth'
import { Request } from 'express'
import { NotFoundException } from './global/custom-exceptions/not.found.exception'
import { Types } from '../types/types'

export const getUserFromRequest = (req: Request): Types.User.IUser => {
    const user = req['user']
    if (!user) {
        throw new NotFoundException('User not found in request')
    }
    return user
}

export const getFirebaseUserFromRequest = (req: Request): UserRecord =>
    req['firebaseUser']
