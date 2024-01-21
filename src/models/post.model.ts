import { model, Schema } from 'mongoose'
import BaseSchema from './base.model'
import { Types } from '../types/types'

export const PostsSchema = new Schema<Types.Posts.IPost>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}).add(BaseSchema)

const PostsModel = model('posts', PostsSchema)

export default PostsModel
