import axios from 'axios'
import { useState } from 'react'

import { loginUser, registerUser } from '@/api/auth-api'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { SignupPage } from '@/pages/signup-page'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type CurrentPage = 'landing' | 'login' | 'signup' | 'dashboard'

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
        onLogout={() => {
          setRegisteredTeacher(null)
          setAuthError(null)
          setCurrentPage('login')
        }}
      />
    )
  }

  if (currentPage === 'login') {
    return (
      <LoginPage
        authError={authError}
        isAuthLoading={isAuthLoading}
        onBackToLanding={() => {
          setAuthError(null)
          setCurrentPage('landing')
        }}
        onOpenSignup={() => {
          setAuthError(null)
          setCurrentPage('signup')
        }}
        onLogin={handleLogin}
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
          setCurrentPage('login')
        }}
        onSignup={handleSignup}
      />
    )
  }

  return (
    <LandingPage
      onClearAuthError={() => setAuthError(null)}
      onOpenLoginPage={() => setCurrentPage('login')}
      onOpenSignupPage={() => setCurrentPage('signup')}
    />
  )
}

export default App
