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
import { StudentTrackingSection } from '@/components/landing/student-tracking-section'
import { VideoPlayerSection } from '@/components/landing/video-player-section'
import type { LoginFormValues } from '@/types/auth'

type LandingPageProps = {
  authError: string | null
  isAuthLoading: boolean
  onClearAuthError: () => void
  onLogin: (values: LoginFormValues) => Promise<boolean>
  onOpenSignupPage: () => void
}

export function LandingPage({
  authError,
  isAuthLoading,
  onClearAuthError,
  onLogin,
  onOpenSignupPage,
}: LandingPageProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  function openLoginModal() {
    onClearAuthError()
    setIsLoginModalOpen(true)
  }

  function openSignupPage() {
    onClearAuthError()
    onOpenSignupPage()
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenSignup={openSignupPage}
        onOpenLogin={openLoginModal}
      />
      <HeroSection onOpenSignup={openSignupPage} />
      <FeaturesSection />
      <ProcessSection />
      <BenefitsSection />
      <StudentTrackingSection />
      <VideoPlayerSection />
      <FaqSection />
      <FinalCtaSection onOpenSignup={openSignupPage} />
      <LandingFooter />
      <LoginModal
        errorMessage={authError}
        isLoading={isAuthLoading}
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={onLogin}
      />
    </main>
  )
}
