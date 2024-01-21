import { model, Schema } from 'mongoose'
import BaseSchema from './base.model'
import { Types } from '../types/types'
import bcrypt from 'bcrypt'

export const UserSchema = new Schema<Types.User.IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
})
    .add(BaseSchema)
    .pre('save', async function (next) {
        if (!this.isModified('password')) return next()
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    })
    .method('comparePassword', async function (password: string) {
        return await bcrypt.compare(password, this.password)
    })

const UserModel = model('users', UserSchema)

export default UserModel
