import axios from 'axios'
import { useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'

import { loginUser, registerUser } from '@/api/auth-api'
import { AppRoutes } from '@/router'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type RegisteredTeacher = Pick<AuthResponse, 'firstName' | 'lastName'>

function getAuthErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? 'Une erreur est survenue.'
  }

  return 'Une erreur est survenue.'
}

function AppContent() {
  const navigate = useNavigate()
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
      navigate('/dashboard/students')

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  function openLandingDemo() {
    navigate('/')

    requestAnimationFrame(() => {
      document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })
    })
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
      navigate('/dashboard/students')

      return true
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))

      return false
    } finally {
      setIsAuthLoading(false)
    }
  }

  function handleLogout() {
    setRegisteredTeacher(null)
    setAuthError(null)
    navigate('/login')
  }

  return (
    <AppRoutes
      authError={authError}
      isAuthLoading={isAuthLoading}
      teacher={registeredTeacher}
      onClearAuthError={() => setAuthError(null)}
      onLogin={handleLogin}
      onLogout={handleLogout}
      onSignup={handleSignup}
      onOpenDemo={openLandingDemo}
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
