import { model, Schema } from 'mongoose'
import BaseSchema from './base.model'
import { UserStatusEnum } from '../common/enums/user/user.status.enum'
import { Types } from '../types/types'

export const UserSchema = new Schema<Types.User.IUser>({
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
}).add(BaseSchema)

const UserModel = model('users', UserSchema)

export default UserModel
