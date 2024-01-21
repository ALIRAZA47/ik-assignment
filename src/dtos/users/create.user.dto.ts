import Joi from 'joi'
import { Types } from '../../types/types'

export const SignupUserJoiSchema = Joi.object<Types.User.SignupDto>().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})
