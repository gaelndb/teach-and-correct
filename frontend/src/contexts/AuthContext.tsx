import axios from 'axios'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { authService } from '@/api/services/authService'
import type { AuthUser, LoginFormValues, RegistrationFormValues } from '@/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  authError: string | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  login: (values: LoginFormValues) => Promise<boolean>
  register: (values: RegistrationFormValues) => Promise<boolean>
  logout: () => void
  clearAuthError: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getAuthErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? 'Une erreur est survenue.'
  }

  return 'Une erreur est survenue.'
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    async function restoreAuth() {
      const storedAuth = authService.getStoredAuth()

      if (storedAuth) {
        setUser(authService.toAuthUser(storedAuth))
      }

      setIsAuthLoading(false)
    }

    restoreAuth()
  }, [])

  async function register(values: RegistrationFormValues) {
    setAuthError(null)
    setIsAuthLoading(true)

    try {
      const authResponse = await authService.register(values)
      setUser(authService.toAuthUser(authResponse))

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  async function login(values: LoginFormValues) {
    setAuthError(null)
    setIsAuthLoading(true)

    try {
      const authResponse = await authService.login(values)
      setUser(authService.toAuthUser(authResponse))

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  function logout() {
    authService.logout()
    setUser(null)
    setAuthError(null)
  }

  function clearAuthError() {
    setAuthError(null)
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    authError,
    isAuthenticated: user !== null,
    isAuthLoading,
    login,
    register,
    logout,
    clearAuthError,
  }), [authError, isAuthLoading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
