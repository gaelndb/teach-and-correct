import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/landing/brand-logo'

const navigationItems = [
  { label: 'Fonctionnement', href: '#fonctionnement' },
  { label: 'FAQ', href: '#faq' },
]

type LandingHeaderProps = {
  onOpenContact: () => void
  onOpenLanding?: () => void
  onOpenSignup: () => void
  onOpenLogin: () => void
}

export function LandingHeader({ onOpenContact, onOpenLanding, onOpenSignup, onOpenLogin }: LandingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#385f49]">
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <button type="button" onClick={onOpenLanding} className="text-left">
          <BrandLogo />
        </button>

        <nav className="hidden items-center gap-12 text-lg font-semibold text-white/65 md:flex">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <button type="button" onClick={onOpenContact} className="transition-colors hover:text-white">
            Contact
          </button>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Button
            size="sm"
            onClick={onOpenLogin}
            className="h-12 rounded-lg bg-[#5f9674] px-7 text-base text-white shadow-none hover:bg-[#6aa680]"
          >
            Connexion
          </Button>
          <Button
            size="sm"
            onClick={onOpenSignup}
            className="h-12 rounded-lg bg-[#d3634d] px-7 text-base text-white shadow-none hover:bg-[#c95540]"
          >
            Essayer gratuitement
          </Button>
        </div>
      </div>
    </header>
  )
}
