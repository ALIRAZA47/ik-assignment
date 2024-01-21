import Joi from 'joi'

export const ScrapUsingUrlsDto = Joi.object({
    urls: Joi.array().items(Joi.string().uri().required()).required(),
})
