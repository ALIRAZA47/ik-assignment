import { model, Schema } from 'mongoose'
import BaseSchema from './base.model'
import { UserStatusEnum } from '../common/enums/user/user.status.enum'
import { Types } from '../types/types'

export const UserSchema = new Schema<Types.User.IUser>({
    fuid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    status: {
        type: String,
        default: UserStatusEnum.PENDING,
        enum: [...Object.values(UserStatusEnum)],
    },
    verificationCode: {
        type: String,
    },
}).add(BaseSchema)

const UserModel = model('user', UserSchema)

export default UserModel
