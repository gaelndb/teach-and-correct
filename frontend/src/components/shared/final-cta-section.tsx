import { BarChart3, Check, Send, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

const perks = [
  'Sans carte bancaire requise',
  'Résultats visibles dès la première copie',
  'Données hébergées en Europe, conformes RGPD',
]

const unlockedFeatures = [
  {
    title: 'Correction IA',
    description: "Importez et corrigez toutes vos copies avec l'assistance de l'IA.",
    icon: Sparkles,
  },
  {
    title: 'Suivi des élèves',
    description: "Consultez l'historique des notes et la progression de chaque élève.",
    icon: BarChart3,
  },
  {
    title: 'Restitution claire',
    description: "Transmettez un retour structuré et lisible directement à l'élève.",
    icon: Send,
  },
]

type FinalCtaSectionProps = {
  onOpenSignup: () => void
}

export function FinalCtaSection({ onOpenSignup }: FinalCtaSectionProps) {
  return (
    <section className="bg-[#fbfaf6] px-6 pb-28">
      <div className="mx-auto grid max-w-7xl gap-12 rounded-3xl bg-[#edf5f1] p-8 sm:p-12 lg:grid-cols-[1.2fr_0.95fr] lg:p-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Prêt à commencer ?</p>
          <h2 className="mt-7 max-w-xl text-4xl font-black leading-tight tracking-[-0.055em] text-[#385f49] sm:text-5xl">
            Essayez TeachAndCorrect gratuitement
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#7d987f]">
            Importez votre première copie, voyez la proposition de correction, et décidez si l'outil vous convient — sans engagement.
          </p>

          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-4 text-base text-[#385f49]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5f9674] text-white">
                  <Check className="h-4 w-4" />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button onClick={onOpenSignup} className="h-14 rounded-xl bg-[#d3634d] px-8 text-base text-white shadow-none hover:bg-[#c95540]">
              Essayer gratuitement
            </Button>
            <Button variant="outline" className="h-14 rounded-xl border-[#dfe7df] bg-white px-8 text-base text-[#385f49] shadow-none hover:bg-white">
              Voir une démo
            </Button>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Ce que vous débloquez</p>
          <div className="mt-6 space-y-4">
            {unlockedFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <article key={feature.title} className="flex gap-4 rounded-2xl border border-[#dfe7df] bg-white p-5 shadow-[0_12px_30px_rgba(56,95,73,0.05)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#dfe7df] text-[#5f9674]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#385f49]">{feature.title}</h3>
                    <p className="mt-2 leading-6 text-[#7d987f]">{feature.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
