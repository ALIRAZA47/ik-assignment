import { BaseSchemaType } from './base.schema.type'

declare namespace Posts {
  interface IPost extends BaseSchemaType {
    title: string
    description: string
  }
}
