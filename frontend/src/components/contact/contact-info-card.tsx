import { Clock3, Mail, ShieldCheck } from 'lucide-react'

const contactInformation = [
  {
    label: 'E-mail',
    value: 'contact@teachandcorrect.fr',
    icon: Mail,
  },
  {
    label: 'Délai de réponse',
    value: 'Sous 24h en semaine',
    icon: Clock3,
  },
  {
    label: 'Pour les établissements',
    value: 'Tarifs dédiés sur demande',
    icon: ShieldCheck,
  },
]

export function ContactInfoCard() {
  return (
    <aside className="rounded-2xl bg-[#385f49] p-8 text-white sm:p-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d3634d]">Parlons-en</p>
      <h2 className="mt-5 max-w-sm text-3xl font-black leading-tight tracking-[-0.04em]">
        Vous avez des questions sur TeachAndCorrect ?
      </h2>
      <p className="mt-6 text-base leading-7 text-white/62">
        Que vous souhaitiez tester l'outil, comprendre comment il s'intègre dans votre pratique ou connaître les options pour votre établissement — on est là.
      </p>

      <div className="mt-9 space-y-5">
        {contactInformation.map((information) => {
          const Icon = information.icon

          return (
            <div key={information.label} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#d3634d]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/45">{information.label}</p>
                <p className="mt-1 text-sm font-black text-white">{information.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-12 text-sm leading-6 text-white/35">
        Chaque demande est lue par un membre de l'équipe. Pas de réponse automatique.
      </p>
    </aside>
  )
}
