import Joi from 'joi'
import { Types } from '../../types/types'

export const LoginUserJoiSchema = Joi.object<Types.User.LoginDto>().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
