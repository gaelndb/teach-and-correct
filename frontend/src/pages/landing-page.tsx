import { useState } from 'react'

import { HeroSection } from '@/components/landing/hero-section'
import { LandingHeader } from '@/components/landing/landing-header'
import { SignupModal, type SignupFormValues } from '@/components/landing/signup-modal'
import { WorkflowSection } from '@/components/landing/workflow-section'

type LandingPageProps = {
  onOpenDashboard: () => void
  onSignup: (values: SignupFormValues) => void
}

export function LandingPage({ onOpenDashboard, onSignup }: LandingPageProps) {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <LandingHeader
        onOpenDashboard={onOpenDashboard}
        onOpenSignup={() => setIsSignupModalOpen(true)}
      />
      <HeroSection />
      <WorkflowSection />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSubmit={onSignup}
      />
    </main>
  )
}
