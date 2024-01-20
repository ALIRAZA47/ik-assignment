import Joi from 'joi'

export const ScrapUsingUrlsValidator = Joi.object({
    urls: Joi.array().items(Joi.string().uri().required()).required(),
})
