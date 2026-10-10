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

export type AuthUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export type AuthResponse = AuthUser & {
  accessToken: string
  accessTokenExpiresInMs: number
  refreshToken: string
  refreshTokenExpiresInMs: number
}

export type RegisterRequest = Omit<SignupFormValues, 'confirmPassword'>

export type LoginRequest = LoginFormValues

export type RefreshTokenRequest = {
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  accessTokenExpiresInMs: number
}
