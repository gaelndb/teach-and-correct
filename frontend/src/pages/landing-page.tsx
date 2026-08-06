import { useState } from 'react'

import { HeroSection } from '@/components/landing/hero-section'
import { LandingHeader } from '@/components/landing/landing-header'
import { LoginModal } from '@/components/landing/login-modal'
import { SignupModal } from '@/components/landing/signup-modal'
import { WorkflowSection } from '@/components/landing/workflow-section'
import type { LoginFormValues, SignupFormValues } from '@/types/auth'

type LandingPageProps = {
  onLogin: (values: LoginFormValues) => void
  onSignup: (values: SignupFormValues) => void
}

export function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <LandingHeader
        onOpenSignup={() => setIsSignupModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />
      <HeroSection />
      <WorkflowSection />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={onLogin}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSubmit={onSignup}
      />
    </main>
  )
}
