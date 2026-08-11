import { apiClient } from '@/api/apiClient'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type RegisterPayload = Omit<SignupFormValues, 'confirmPassword'>

export async function registerUser(values: SignupFormValues) {
  const payload: RegisterPayload = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  }

  const response = await apiClient.post<AuthResponse>('/auth/register', payload)

  return response.data
}

export async function loginUser(values: LoginFormValues) {
  const response = await apiClient.post<AuthResponse>('/auth/login', values)

  return response.data
}
