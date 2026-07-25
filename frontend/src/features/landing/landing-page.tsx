import { HeroSection } from '@/features/landing/components/hero-section'
import { LandingHeader } from '@/features/landing/components/landing-header'
import { WorkflowSection } from '@/features/landing/components/workflow-section'

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
