import { BaseSchemaType } from './base.schema.type'
import { JwtPayload } from 'jsonwebtoken'

declare namespace Users {
  interface IUser extends BaseSchemaType {
    name: string
    email: string
    password: string
    comparePassword: (password: string) => Promise<boolean>
  }

  interface SignupDto {
    email: string
    password: string
    name: string
  }

  interface LoginDto {
    email: string
    password: string
  }

  interface AuthUser extends JwtPayload {
    id: string
    email: string
    name: string
  }
}
