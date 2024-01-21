import Jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { Types } from '../types/types'

config()

export class JwtService {
    private readonly jwtSecret: string

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET
    }

    sign(payload: Types.User.AuthUser) {
        return Jwt.sign(payload, this.jwtSecret)
    }

    verify(token: string) {
        return Jwt.verify(token, this.jwtSecret)
    }

    decode(token: string): Types.User.AuthUser {
        return Jwt.decode(token) as Types.User.AuthUser
    }
}
