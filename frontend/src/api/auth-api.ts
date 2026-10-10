import { api } from '@/api/api-client'
import type {
  AuthResponse,
  LoginFormValues,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegistrationFormValues,
} from '@/types/auth'

type RegistrationPayload = Omit<RegistrationFormValues, 'confirmPassword'>

export function registerRequest(payload: RegistrationPayload): Promise<AuthResponse> {
  return api.post<AuthResponse, RegistrationPayload>('/auth/register', payload)
}

export function loginRequest(credentials: LoginFormValues): Promise<AuthResponse> {
  return api.post<AuthResponse, LoginFormValues>('/auth/login', credentials)
}

export function refreshTokenRequest(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  return api.post<RefreshTokenResponse, RefreshTokenRequest>('/auth/refresh', payload)
}
