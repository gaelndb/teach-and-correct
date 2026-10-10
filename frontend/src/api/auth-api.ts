import { api } from '@/api/api-client'
import type {
  AuthResponse,
  LoginFormValues,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  SignupFormValues,
} from '@/types/auth'

export function registerRequest(payload: RegisterRequest): Promise<AuthResponse> {
  return api.post<AuthResponse, RegisterRequest>('/auth/register', payload)
}

export function loginRequest(credentials: LoginRequest): Promise<AuthResponse> {
  return api.post<AuthResponse, LoginRequest>('/auth/login', credentials)
}

export function refreshTokenRequest(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  return api.post<RefreshTokenResponse, RefreshTokenRequest>('/auth/refresh', payload)
}

export function registerUser(values: SignupFormValues): Promise<AuthResponse> {
  const payload: RegisterRequest = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  }

  return registerRequest(payload)
}

export function loginUser(values: LoginFormValues): Promise<AuthResponse> {
  return loginRequest(values)
}
