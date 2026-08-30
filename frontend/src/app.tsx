import axios from 'axios'
import { useState } from 'react'

import { loginUser, registerUser } from '@/api/auth-api'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import { SignupPage } from '@/pages/signup-page'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type CurrentPage = 'landing' | 'signup' | 'dashboard'

type RegisteredTeacher = Pick<AuthResponse, 'firstName' | 'lastName'>

function getAuthErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? 'Une erreur est survenue.'
  }

  return 'Une erreur est survenue.'
}

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing')
  const [registeredTeacher, setRegisteredTeacher] = useState<RegisteredTeacher | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  async function handleSignup(values: SignupFormValues) {
    setAuthError(null)
    setIsAuthLoading(true)

    try {
      const user = await registerUser(values)

      setRegisteredTeacher({
        firstName: user.firstName,
        lastName: user.lastName,
      })
      setCurrentPage('dashboard')

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  async function handleLogin(values: LoginFormValues) {
    setAuthError(null)
    setIsAuthLoading(true)

    try {
      const user = await loginUser(values)

      setRegisteredTeacher({
        firstName: user.firstName,
        lastName: user.lastName,
      })
      setCurrentPage('dashboard')

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  if (currentPage === 'dashboard') {
    return (
      <DashboardPage
        teacher={registeredTeacher}
        onBackToLanding={() => setCurrentPage('landing')}
      />
    )
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage
        authError={authError}
        isAuthLoading={isAuthLoading}
        onBackToLanding={() => {
          setAuthError(null)
          setCurrentPage('landing')
        }}
        onOpenLogin={() => {
          setAuthError(null)
          setCurrentPage('landing')
        }}
        onSignup={handleSignup}
      />
    )
  }

  return (
    <LandingPage
      authError={authError}
      isAuthLoading={isAuthLoading}
      onClearAuthError={() => setAuthError(null)}
      onLogin={handleLogin}
      onOpenSignupPage={() => setCurrentPage('signup')}
    />
  )
}

export default App
