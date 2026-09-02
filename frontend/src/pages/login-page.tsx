import { LoginForm } from '@/components/login/login-form'
import { LoginSidePanel } from '@/components/login/login-side-panel'
import type { LoginFormValues } from '@/types/auth'

type LoginPageProps = {
  authError: string | null
  isAuthLoading: boolean
  onBackToLanding: () => void
  onOpenSignup: () => void
  onLogin: (values: LoginFormValues) => Promise<boolean>
}

export function LoginPage({ authError, isAuthLoading, onBackToLanding, onOpenSignup, onLogin }: LoginPageProps) {
  return (
    <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[0.82fr_1fr]">
      <LoginSidePanel onOpenLanding={onBackToLanding} />
      <LoginForm
        errorMessage={authError}
        isLoading={isAuthLoading}
        onBack={onBackToLanding}
        onOpenSignup={onOpenSignup}
        onSubmit={onLogin}
      />
    </main>
  )
}
