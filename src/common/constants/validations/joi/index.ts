import defaultCustomMessages from './customMessages.json'
import Joi from 'joi'

const joiValidateOptions: Joi.ValidationOptions = {
    abortEarly: false,
    externals: true,
    errors: {
        wrap: {
            label: '',
        },
    },
    messages: defaultCustomMessages as any,
}
export default joiValidateOptions
