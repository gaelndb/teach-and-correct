import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/landing/brand-logo'

const navigationItems = [
  { label: 'Fonctionnement', href: '#fonctionnement' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'FAQ', href: '#faq' },
]

type LandingHeaderProps = {
  onOpenDashboard: () => void
  onOpenSignup: () => void
}

export function LandingHeader({ onOpenDashboard, onOpenSignup }: LandingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <BrandLogo />

        <nav className="hidden items-center gap-8 text-sm font-semibold text-primary/75 md:flex">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" onClick={onOpenDashboard}>
            Connexion
          </Button>
          <Button size="sm" variant="secondary" onClick={onOpenSignup}>
            Inscription
          </Button>
        </div>
      </div>
    </header>
  )
}
