import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { authStorage } from '@/api/storage/authStorage'
import type { RefreshTokenRequest, RefreshTokenResponse } from '@/types/auth'

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

const AUTH_ROUTES_WITHOUT_REFRESH = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
]

function clearSessionAndRedirect(): void {
  authStorage.clearAuth()
  window.location.replace('/login')
}

export function setupTokenRefreshInterceptor(axiosClient: AxiosInstance): void {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined
      const requestPath = originalRequest?.url?.split('?')[0]
      const shouldSkipRefresh = requestPath
        ? AUTH_ROUTES_WITHOUT_REFRESH.includes(requestPath)
        : false

      if (
        error.response?.status !== 401
        || !originalRequest
        || originalRequest._retry
        || shouldSkipRefresh
      ) {
        return Promise.reject(error)
      }

      const refreshToken = authStorage.getRefreshToken()

      if (!refreshToken) {
        clearSessionAndRedirect()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const payload: RefreshTokenRequest = { refreshToken }
        const response = await axiosClient.post<RefreshTokenResponse>('/auth/refresh', payload)
        const storedAuth = authStorage.getStoredAuth()

        if (!storedAuth) {
          clearSessionAndRedirect()
          return Promise.reject(error)
        }

        authStorage.saveAuth({
          ...storedAuth,
          accessToken: response.data.accessToken,
        })

        return axiosClient.request(originalRequest)
      } catch (refreshError) {
        clearSessionAndRedirect()
        return Promise.reject(refreshError)
      }
    },
  )
}
