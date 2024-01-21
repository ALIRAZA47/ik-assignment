// types.d.ts

import { Users as _User } from './user.types'
import { Posts as _Posts } from './posts.types'

declare namespace Types {
  export import User = _User
  export import Posts = _Posts
  namespace Scrapping {
    interface Response {
      url: string
      success: boolean
      content?: string
    }
  }

  namespace API {
    interface ArrayData<T> {
      count: number
      data: T[]
    }
  }
}
