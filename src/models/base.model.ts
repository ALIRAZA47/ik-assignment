import { Schema, Types } from 'mongoose'

const BaseSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)
    .pre('save', function (next) {
        if (this.isNew) {
            this._id = new Types.ObjectId()
        }
        next()
    })
    .pre('find', function () {
        this.where({ isDeleted: false })
    })
    .pre('findOne', function () {
        this.where({ isDeleted: false })
    })
    .pre('findOneAndUpdate', function () {
        this.where({ isDeleted: false })
    })
    .pre('update', function () {
        this.where({ isDeleted: false })
    })
    .pre('updateOne', function () {
        this.where({ isDeleted: false })
    })
    .pre('updateMany', function () {
        this.where({ isDeleted: false })
    })
    .pre('deleteOne', function () {
        this.where({ isDeleted: false })
    })
    .pre('deleteMany', function () {
        this.where({ isDeleted: false })
    })
    .pre('count', function () {
        this.where({ isDeleted: false })
    })
    .pre('countDocuments', function () {
        this.where({ isDeleted: false })
    })
    .pre('estimatedDocumentCount', function () {
        this.where({ isDeleted: false })
    })

export default BaseSchema
