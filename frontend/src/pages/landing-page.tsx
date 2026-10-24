import { BenefitsSection } from '@/components/landing/benefits-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HeroSection } from '@/components/landing/hero-section'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'
import { ProcessSection } from '@/components/landing/process-section'
import { StudentTrackingSection } from '@/components/landing/student-tracking-section'
import { FaqSection } from '@/components/shared/faq-section'

type LandingPageProps = {
  onClearAuthError: () => void
  onOpenContactPage: () => void
  onOpenLoginPage: () => void
  onOpenSignupPage: () => void
  onOpenLandingSection: (sectionId: string) => void
}

export function LandingPage({
  onClearAuthError,
  onOpenContactPage,
  onOpenLoginPage,
  onOpenSignupPage,
  onOpenLandingSection,
}: LandingPageProps) {
  function openLoginPage() {
    onClearAuthError()
    onOpenLoginPage()
  }

  function openSignupPage() {
    onClearAuthError()
    onOpenSignupPage()
  }

  function openContactPage() {
    onClearAuthError()
    onOpenContactPage()
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenContact={openContactPage}
        onOpenSection={onOpenLandingSection}
        onOpenSignup={openSignupPage}
        onOpenLogin={openLoginPage}
      />
      <HeroSection onOpenSignup={openSignupPage} />
      <FeaturesSection />
      <ProcessSection />
      <BenefitsSection />
      <StudentTrackingSection />
      <FaqSection />
      <LandingFooter onOpenContact={openContactPage} onOpenSection={onOpenLandingSection} />
    </main>
  )
}
