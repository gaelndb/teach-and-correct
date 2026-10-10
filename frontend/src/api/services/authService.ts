import { loginRequest, refreshTokenRequest, registerRequest } from '@/api/auth-api'
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RefreshTokenResponse,
  RegisterRequest,
} from '@/types/auth'

const USER_AUTH_STORAGE_KEY = 'userAuth'

function toAuthUser(authResponse: AuthResponse): AuthUser {
  return {
    id: authResponse.id,
    firstName: authResponse.firstName,
    lastName: authResponse.lastName,
    email: authResponse.email,
    role: authResponse.role,
  }
}

function saveAuth(authResponse: AuthResponse) {
  localStorage.setItem(USER_AUTH_STORAGE_KEY, JSON.stringify(authResponse))
}

function getStoredAuth(): AuthResponse | null {
  const storedAuth = localStorage.getItem(USER_AUTH_STORAGE_KEY)

  if (!storedAuth) {
    return null
  }

  try {
    return JSON.parse(storedAuth) as AuthResponse
  } catch {
    clearAuth()
    return null
  }
}

function clearAuth() {
  localStorage.removeItem(USER_AUTH_STORAGE_KEY)
}

export const authService = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const authResponse = await registerRequest(payload)
    saveAuth(authResponse)

    return authResponse
  },

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const authResponse = await loginRequest(credentials)
    saveAuth(authResponse)

    return authResponse
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const refreshResponse = await refreshTokenRequest({ refreshToken })
    const storedAuth = getStoredAuth()

    if (storedAuth) {
      saveAuth({
        ...storedAuth,
        accessToken: refreshResponse.accessToken,
        accessTokenExpiresInMs: refreshResponse.accessTokenExpiresInMs,
      })
    }

    return refreshResponse
  },

  logout(): void {
    clearAuth()
  },

  getStoredAuth,
  saveAuth,
  clearAuth,
  toAuthUser,

  getAccessToken(): string | null {
    return getStoredAuth()?.accessToken ?? null
  },

  getRefreshToken(): string | null {
    return getStoredAuth()?.refreshToken ?? null
  },
}
