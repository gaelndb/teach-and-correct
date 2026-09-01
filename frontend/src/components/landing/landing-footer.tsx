import { BrandLogo } from '@/components/landing/brand-logo'

type FooterLink = {
  label: string
  href?: string
  action?: 'contact'
}

const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnement', href: '#fonctionnement' },
      { label: 'Fonctionnalités', href: '#fonctionnalites' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'À propos du projet', href: '#accueil' },
      { label: 'Contact', action: 'contact' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '#accueil' },
      { label: 'Politique de confidentialité', href: '#accueil' },
    ],
  },
]

type LandingFooterProps = {
  onOpenContact: () => void
}

export function LandingFooter({ onOpenContact }: LandingFooterProps) {
  return (
    <footer className="bg-[#385f49] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-xs text-base leading-8 text-white/45">
              Correction de copies assistée par IA pour les enseignants.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">{column.title}</h3>
              <ul className="mt-6 space-y-4 text-white/45">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'contact' ? (
                      <button type="button" onClick={onOpenContact} className="transition hover:text-white">
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="transition hover:text-white">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/30">
          © 2026 TeachAndCorrect
        </div>
      </div>
    </footer>
  )
}
