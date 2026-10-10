import { loginRequest, refreshTokenRequest, registerRequest } from '@/api/auth-api'
import { authStorage } from '@/api/services/authStorage'
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RefreshTokenResponse,
  RegisterRequest,
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
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const authResponse = await registerRequest(payload)
    authStorage.saveAuth(authResponse)

    return authResponse
  },

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const authResponse = await loginRequest(credentials)
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
