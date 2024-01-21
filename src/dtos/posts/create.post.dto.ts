import Joi from 'joi'

export interface CreatePostDto {
  title: string
  description?: string
}

export const CreatePostJoiSchema = Joi.object<CreatePostDto>({
    title: Joi.string().required(),
    description: Joi.string().optional(),
})
