import { Types } from '../../types/types'
import { CreatePostDto } from '../../dtos/posts/create.post.dto'
import PostsModel from '../../models/post.model'
import HttpException from '../../utils/global/httpException'
import { HttpStatusCode } from 'axios'
import { NotFoundException } from '../../utils/global/custom-exceptions/not.found.exception'

export class Problem4PostsCrud {
    constructor() {
    // nothing
    }

    async readAll(): Promise<Types.API.ArrayData<Types.Posts.IPost>> {
        try {
            const posts: Types.Posts.IPost[] = await PostsModel.find()
            return { count: posts.length, data: posts }
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message || 'Failed to read posts',
            )
        }
    }

    async readById(id: string) {
        try {
            const post = await PostsModel.findById(id)
            if (!post) {
                throw new NotFoundException(`Post with id '${id}' not found`)
            }
            return post
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message || 'Failed to read post',
            )
        }
    }

    async create(payload: CreatePostDto) {
        try {
            const newPost: Types.Posts.IPost = {
                title: payload.title,
                description: payload.description,
            }
            const modeledPost = new PostsModel({ ...newPost })
            const savedPost = await modeledPost.save()
            return savedPost
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message || 'Failed to create post',
            )
        }
    }

    async update(postId: string, payload: CreatePostDto) {
        try {
            const post = await PostsModel.findById(postId)
            if (!post) {
                throw new NotFoundException(`Post with id '${postId}' not found`)
            }
            post.title = payload.title
            post.description = payload.description
            const updatedPost = await post.save()
            return updatedPost
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message || 'Failed to update post',
            )
        }
    }

    async delete(postId: string) {
        try {
            const post = await PostsModel.findById(postId)
            if (!post) {
                throw new NotFoundException(`Post with id '${postId}' not found`)
            }
            post.isDeleted = true
            post.deletedAt = new Date()
            await post.save()
        } catch (e) {
            throw new HttpException(
                e?.statusCode || HttpStatusCode.InternalServerError,
                e?.message || 'Failed to delete post',
            )
        }
    }
}
