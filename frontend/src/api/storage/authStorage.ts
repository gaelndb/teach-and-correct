import type { AuthResponse } from '@/types/auth'

const USER_AUTH_STORAGE_KEY = 'userAuth'

function saveAuth(authResponse: AuthResponse): void {
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

function clearAuth(): void {
  localStorage.removeItem(USER_AUTH_STORAGE_KEY)
}

function getAccessToken(): string | null {
  return getStoredAuth()?.accessToken ?? null
}

function getRefreshToken(): string | null {
  return getStoredAuth()?.refreshToken ?? null
}

export const authStorage = {
  saveAuth,
  getStoredAuth,
  clearAuth,
  getAccessToken,
  getRefreshToken,
}
