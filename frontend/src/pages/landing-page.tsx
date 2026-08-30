import { useState } from 'react'

import { BenefitsSection } from '@/components/landing/benefits-section'
import { FaqSection } from '@/components/landing/faq-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FinalCtaSection } from '@/components/landing/final-cta-section'
import { HeroSection } from '@/components/landing/hero-section'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'
import { LoginModal } from '@/components/landing/login-modal'
import { ProcessSection } from '@/components/landing/process-section'
import { SignupModal } from '@/components/landing/signup-modal'
import { StudentTrackingSection } from '@/components/landing/student-tracking-section'
import { VideoPlayerSection } from '@/components/landing/video-player-section'
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
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenSignup={openSignupModal}
        onOpenLogin={openLoginModal}
      />
      <HeroSection onOpenSignup={openSignupModal} />
      <FeaturesSection />
      <ProcessSection />
      <BenefitsSection />
      <StudentTrackingSection />
      <VideoPlayerSection />
      <FaqSection />
      <FinalCtaSection onOpenSignup={openSignupModal} />
      <LandingFooter />
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
