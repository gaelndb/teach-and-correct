import axios from 'axios'

import { setupTokenRefreshInterceptor } from '@/api/interceptors/token-refresh-interceptor'
import { authStorage } from '@/api/services/authStorage'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const accessToken = authStorage.getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

setupTokenRefreshInterceptor(axiosClient)

async function post<TResponse, TPayload = undefined>(url: string, payload?: TPayload): Promise<TResponse> {
  const response = await axiosClient.post<TResponse>(url, payload)

  return response.data
}

export const api = {
  post,
}
