import { useNavigate } from 'react-router-dom'

import { SignupForm } from '@/components/signup/signup-form'
import { SignupSidePanel } from '@/components/signup/signup-side-panel'
import { useAuth } from '@/contexts/AuthContext'
import type { RegistrationFormValues } from '@/types/auth'

type SignupPageProps = {
  onBackToLanding: () => void
  onOpenLogin: () => void
}

export function SignupPage({ onBackToLanding, onOpenLogin }: SignupPageProps) {
  const navigate = useNavigate()
  const { authError, isAuthLoading, register } = useAuth()

  async function handleRegistration(values: RegistrationFormValues) {
    const isRegistrationSuccessful = await register(values)

    if (isRegistrationSuccessful) {
      navigate('/dashboard/students')
    }

    return isRegistrationSuccessful
  }

  return (
    <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[0.82fr_1fr]">
      <SignupSidePanel onOpenLanding={onBackToLanding} />
      <SignupForm
        errorMessage={authError}
        isLoading={isAuthLoading}
        onBack={onBackToLanding}
        onOpenLogin={onOpenLogin}
        onSubmit={handleRegistration}
      />
    </main>
  )
}
