export type SignupFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginFormValues = {
  email: string
  password: string
}

export type AuthResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}
