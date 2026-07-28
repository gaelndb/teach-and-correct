import { HeroSection } from '@/components/landing/hero-section'
import { LandingHeader } from '@/components/landing/landing-header'
import { WorkflowSection } from '@/components/landing/workflow-section'

type LandingPageProps = {
  onOpenDashboard: () => void
}

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <LandingHeader onOpenDashboard={onOpenDashboard} />
      <HeroSection />
      <WorkflowSection />
    </main>
  )
}
