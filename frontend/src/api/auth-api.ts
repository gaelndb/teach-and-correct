import { api } from '@/api/api-client'
import type {
  AuthResponse,
  LoginFormValues,
  RegistrationFormValues,
} from '@/types/auth'

type RegistrationPayload = Omit<RegistrationFormValues, 'confirmPassword'>

export function registerRequest(payload: RegistrationPayload): Promise<AuthResponse> {
  return api.post<AuthResponse, RegistrationPayload>('/auth/register', payload)
}

export function loginRequest(credentials: LoginFormValues): Promise<AuthResponse> {
  return api.post<AuthResponse, LoginFormValues>('/auth/login', credentials)
}
