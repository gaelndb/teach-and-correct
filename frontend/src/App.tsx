import axios from 'axios'
import { useState } from 'react'

import { loginUser, registerUser } from '@/api/authApi'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type CurrentPage = 'landing' | 'dashboard'

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
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))
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
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))
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

  return (
    <LandingPage
      authError={authError}
      isAuthLoading={isAuthLoading}
      onClearAuthError={() => setAuthError(null)}
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
  )
}

export default App
