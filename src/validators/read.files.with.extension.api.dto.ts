import Joi from 'joi'

export const ReadFilesWithExtensionApiDto = Joi.object({
    extension: Joi.string()
        .regex(new RegExp(/(\.[a-zA-Z0-9]+)$/))
        .required()
        .messages({
            'string.pattern.base': 'Extension must start with a dot (.) (e.g. .txt)',
            'string.empty': 'Extension cannot be empty',
            'any.required': 'Extension is required',
        })
        .description('Extension of the file to read'),
})
