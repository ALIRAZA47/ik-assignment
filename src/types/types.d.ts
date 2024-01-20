// types.d.ts

import { User as _User } from './user.types'

declare namespace Types {
  export import User = _User
  namespace Scrapping {
    interface Response {
      url: string
      success: boolean
      content?: string
    }
  }
}
