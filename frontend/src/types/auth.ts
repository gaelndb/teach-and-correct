export type RegistrationFormValues = {
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

export type AuthUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export type AuthResponse = AuthUser & {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenRequest = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
}
