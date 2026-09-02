import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfoCard } from '@/components/contact/contact-info-card'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'
import { FaqSection } from '@/components/shared/faq-section'
import { FinalCtaSection } from '@/components/shared/final-cta-section'

type ContactPageProps = {
  onOpenContact: () => void
  onOpenDemo: () => void
  onOpenLanding: () => void
  onOpenLogin: () => void
  onOpenSignup: () => void
}

export function ContactPage({ onOpenContact, onOpenDemo, onOpenLanding, onOpenLogin, onOpenSignup }: ContactPageProps) {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenContact={onOpenContact}
        onOpenLanding={onOpenLanding}
        onOpenLogin={onOpenLogin}
        onOpenSignup={onOpenSignup}
      />

      <section className="px-6 pb-20 pt-36 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Contact</p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] text-[#385f49] sm:text-5xl">
            Une question ? Écrivons-nous.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#7d987f]">
            Notre équipe répond à toutes vos questions sur l'outil, les tarifs ou la mise en place dans votre établissement.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[0.82fr_1.15fr]">
          <ContactInfoCard />
          <ContactForm />
        </div>
      </section>

      <FaqSection />
      <FinalCtaSection onOpenDemo={onOpenDemo} onOpenSignup={onOpenSignup} />
      <LandingFooter onOpenContact={onOpenContact} />
    </main>
  )
}
