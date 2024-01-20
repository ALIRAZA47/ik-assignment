// types.d.ts

import { User as _User } from './user.types'
import * as _HttpStatus from 'http-status'

declare namespace Types {
  export import User = _User
  export import HttpStatus = _HttpStatus
}
