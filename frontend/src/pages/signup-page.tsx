import { SignupForm } from '@/components/signup/signup-form'
import { SignupSidePanel } from '@/components/signup/signup-side-panel'
import type { SignupFormValues } from '@/types/auth'

type SignupPageProps = {
  authError: string | null
  isAuthLoading: boolean
  onBackToLanding: () => void
  onOpenLogin: () => void
  onSignup: (values: SignupFormValues) => Promise<boolean>
}

export function SignupPage({ authError, isAuthLoading, onBackToLanding, onOpenLogin, onSignup }: SignupPageProps) {
  return (
    <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[0.82fr_1fr]">
      <SignupSidePanel onOpenLanding={onBackToLanding} />
      <SignupForm
        errorMessage={authError}
        isLoading={isAuthLoading}
        onBack={onBackToLanding}
        onOpenLogin={onOpenLogin}
        onSubmit={onSignup}
      />
    </main>
  )
}
