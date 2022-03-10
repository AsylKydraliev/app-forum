export interface User {
  _id: string
  email: string,
  name: string,
  password: string,
  token: string
}

export interface UserData {
  email: string,
  name: string,
  password: string
}

export interface LoginUserData {
  email: string,
  password: string
}

export interface FieldError {
  message: string
}

export interface  RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    name: FieldError
  }
}

export interface LoginError {
  error: string
}
