import { useState } from 'react'

import { HeroSection } from '@/components/landing/hero-section'
import { LandingHeader } from '@/components/landing/landing-header'
import { LoginModal } from '@/components/landing/login-modal'
import { SignupModal } from '@/components/landing/signup-modal'
import { WorkflowSection } from '@/components/landing/workflow-section'
import type { LoginFormValues, SignupFormValues } from '@/types/auth'

type LandingPageProps = {
  authError: string | null
  isAuthLoading: boolean
  onClearAuthError: () => void
  onLogin: (values: LoginFormValues) => Promise<boolean>
  onSignup: (values: SignupFormValues) => Promise<boolean>
}

export function LandingPage({
  authError,
  isAuthLoading,
  onClearAuthError,
  onLogin,
  onSignup,
}: LandingPageProps) {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  function openLoginModal() {
    onClearAuthError()
    setIsLoginModalOpen(true)
  }

  function openSignupModal() {
    onClearAuthError()
    setIsSignupModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <LandingHeader
        onOpenSignup={openSignupModal}
        onOpenLogin={openLoginModal}
      />
      <HeroSection />
      <WorkflowSection />
      <LoginModal
        errorMessage={authError}
        isLoading={isAuthLoading}
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={onLogin}
      />
      <SignupModal
        errorMessage={authError}
        isLoading={isAuthLoading}
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSubmit={onSignup}
      />
    </main>
  )
}
