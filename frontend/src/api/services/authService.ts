import { loginRequest, refreshTokenRequest, registerRequest } from '@/api/auth-api'
import { authStorage } from '@/api/services/authStorage'
import type {
  AuthResponse,
  AuthUser,
  LoginFormValues,
  RefreshTokenResponse,
  RegistrationFormValues,
} from '@/types/auth'

function toAuthUser(authResponse: AuthResponse): AuthUser {
  return {
    id: authResponse.id,
    firstName: authResponse.firstName,
    lastName: authResponse.lastName,
    email: authResponse.email,
    role: authResponse.role,
  }
}

export const authService = {
  async register(registrationFormValues: RegistrationFormValues): Promise<AuthResponse> {
    const authResponse = await registerRequest({
      firstName: registrationFormValues.firstName,
      lastName: registrationFormValues.lastName,
      email: registrationFormValues.email,
      password: registrationFormValues.password,
    })
    authStorage.saveAuth(authResponse)

    return authResponse
  },

  async login(loginFormValues: LoginFormValues): Promise<AuthResponse> {
    const authResponse = await loginRequest(loginFormValues)
    authStorage.saveAuth(authResponse)

    return authResponse
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const refreshResponse = await refreshTokenRequest({ refreshToken })
    const storedAuth = authStorage.getStoredAuth()

    if (storedAuth) {
      authStorage.saveAuth({
        ...storedAuth,
        accessToken: refreshResponse.accessToken,
        accessTokenExpiresInMs: refreshResponse.accessTokenExpiresInMs,
      })
    }

    return refreshResponse
  },

  logout(): void {
    authStorage.clearAuth()
  },

  toAuthUser,
  getStoredAuth: authStorage.getStoredAuth,
  saveAuth: authStorage.saveAuth,
  clearAuth: authStorage.clearAuth,
  getAccessToken: authStorage.getAccessToken,
  getRefreshToken: authStorage.getRefreshToken,
}
