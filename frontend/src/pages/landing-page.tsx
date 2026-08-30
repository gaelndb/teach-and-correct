import { BenefitsSection } from '@/components/landing/benefits-section'
import { FaqSection } from '@/components/landing/faq-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FinalCtaSection } from '@/components/landing/final-cta-section'
import { HeroSection } from '@/components/landing/hero-section'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'
import { ProcessSection } from '@/components/landing/process-section'
import { StudentTrackingSection } from '@/components/landing/student-tracking-section'
import { VideoPlayerSection } from '@/components/landing/video-player-section'

type LandingPageProps = {
  onClearAuthError: () => void
  onOpenLoginPage: () => void
  onOpenSignupPage: () => void
}

export function LandingPage({
  onClearAuthError,
  onOpenLoginPage,
  onOpenSignupPage,
}: LandingPageProps) {
  function openLoginPage() {
    onClearAuthError()
    onOpenLoginPage()
  }

  function openSignupPage() {
    onClearAuthError()
    onOpenSignupPage()
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenSignup={openSignupPage}
        onOpenLogin={openLoginPage}
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
    </main>
  )
}
