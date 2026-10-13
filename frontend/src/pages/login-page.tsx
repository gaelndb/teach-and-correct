import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/login/login-form'
import { LoginSidePanel } from '@/components/login/login-side-panel'
import { useAuth } from '@/contexts/AuthContext'
import type { LoginFormValues } from '@/types/auth'

type LoginPageProps = {
  onBackToLanding: () => void
  onOpenSignup: () => void
}

export function LoginPage({ onBackToLanding, onOpenSignup }: LoginPageProps) {
  const navigate = useNavigate()
  const { authError, isAuthLoading, login } = useAuth()

  async function handleLogin(values: LoginFormValues) {
    const isLoginSuccessful = await login(values)

    if (isLoginSuccessful) {
      navigate('/dashboard/students')
    }

    return isLoginSuccessful
  }

  return (
    <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[0.82fr_1fr]">
      <LoginSidePanel onOpenLanding={onBackToLanding} />
      <LoginForm
        errorMessage={authError}
        isLoading={isAuthLoading}
        onBack={onBackToLanding}
        onOpenSignup={onOpenSignup}
        onSubmit={handleLogin}
      />
    </main>
  )
}
