import { Request } from 'express'
import UserModel from '../../models/user.model'
import HttpException from '../../utils/global/httpException'
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} from '../../common/constants/statusCodes'
import { UserRequestService } from './http-request/user.request.service'
import { Types } from '../../types/types'
import { JwtService } from '../jwt.service'

export class UserService {
    private readonly userRequestService: UserRequestService =
        new UserRequestService()
    private readonly jwtService: JwtService = new JwtService()

    async login(payload: Types.User.LoginDto) {
        try {
            const user = await UserModel.findOne({ email: payload.email })
            if (!user) {
                throw new HttpException(BAD_REQUEST, 'User not found')
            }
            const isPasswordValid = await user.comparePassword(payload.password)
            if (!isPasswordValid) {
                throw new HttpException(BAD_REQUEST, 'Invalid password')
            }
            const token = this.jwtService.sign({
                email: user.email,
                name: user.name,
                id: user.id,
            })
            return { token }
        } catch (e) {
            throw new HttpException(INTERNAL_SERVER_ERROR, 'Error logging in')
        }
    }

    async getCurrentUserDetails(req: Request) {
        try {
            const reqUserDetails: Types.User.AuthUser = req['user']
            const user = await UserModel.findById(reqUserDetails.id)
            if (!user) {
                throw new HttpException(BAD_REQUEST, 'User not found')
            }
            const userDetails = user.toJSON()
            delete userDetails.password
            return userDetails
        } catch (e) {
            throw new HttpException(INTERNAL_SERVER_ERROR, 'Error getting user')
        }
    }

    async createUser(payload: Types.User.SignupDto) {
        try {
            const modeledUserData = new UserModel({
                email: payload.email,
                password: payload.password,
                name: payload.name,
            })
            const savedUserData = await modeledUserData.save()
            const newUser = savedUserData.toJSON()
            delete newUser.password
            return newUser
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException(BAD_REQUEST, 'User already exists')
            }
            throw new HttpException(INTERNAL_SERVER_ERROR, 'Error creating user')
        }
    }
}
