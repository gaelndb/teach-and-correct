import { Clock3, GraduationCap, Shield } from 'lucide-react'

const benefits = [
  {
    title: 'Vous restez décisionnaire',
    description: "L'IA est un assistant, pas un arbitre. Chaque note et chaque annotation est validée par vous avant d'être transmise à l'élève.",
    icon: GraduationCap,
  },
  {
    title: 'Vous gagnez du temps',
    description: "Concentrez-vous sur le retour pédagogique. La saisie, l'annotation et la mise en forme sont prises en charge.",
    icon: Clock3,
  },
  {
    title: 'Vos données sont protégées',
    description: 'Hébergement en Europe, conformité RGPD. Les données de vos élèves ne sont jamais revendues ni utilisées pour entraîner des modèles.',
    icon: Shield,
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-[#385f49] px-6 py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <article key={benefit.title}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-[#d3634d]">
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-2xl font-black tracking-[-0.02em] text-white">{benefit.title}</h3>
              <p className="mt-5 text-lg leading-8 text-white/55">{benefit.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
