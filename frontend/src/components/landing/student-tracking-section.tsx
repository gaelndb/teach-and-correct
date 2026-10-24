import { BarChart3, BookOpen, UsersRound } from 'lucide-react'

const trackingItems = [
  { label: 'Historique des copies et des notes par élève', icon: BookOpen },
  { label: 'Repérage rapide des élèves en difficulté', icon: UsersRound },
  { label: 'Vue centralisée par nom ou classe', icon: BarChart3 },
]

export function StudentTrackingSection() {
  return (
    <section className="bg-[#fbfaf6] px-6 py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Suivi des élèves</p>
          <h2 className="mt-7 max-w-2xl text-4xl font-black leading-tight tracking-[-0.055em] text-[#385f49] sm:text-5xl">
            Suivez les copies et <span className="text-[#5f9674]">les notes</span> de chaque élève sur une seule plateforme.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#7d987f]">
            TeachAndCorrect centralise les copies et les notes de vos élèves. En un coup d'œil, repérez les progrès, observez les tendances et identifiez les élèves qui ont besoin de davantage d'attention.
          </p>

          <ul className="mt-10 space-y-4">
            {trackingItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label} className="flex items-center gap-4 text-lg text-[#385f49]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf5ef] text-[#5f9674]">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.label}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(56,95,73,0.10)]">
          <img src="/tab3.png" alt="Tableau de suivi des élèves" className="w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
