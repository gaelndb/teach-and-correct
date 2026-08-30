import { Clock3, Feather, GraduationCap } from 'lucide-react'

const highlights = [
  {
    label: 'Une copie corrigée en moins de 3 minutes',
    icon: Clock3,
  },
  {
    label: 'Compatible copies manuscrites et tapuscrites',
    icon: Feather,
  },
  {
    label: 'Conçu pour tous les niveaux, du primaire au lycée',
    icon: GraduationCap,
  },
]

export function LoginSidePanel() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between overflow-hidden bg-[#385f49] px-10 py-10 text-white lg:flex xl:px-12 xl:py-14">
      <p className="text-2xl font-black tracking-[-0.03em]">TeachAndCorrect</p>

      <div className="max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
          <span className="h-2 w-2 rounded-full bg-[#d3634d]" />
          Content de vous revoir
        </div>

        <h1 className="mt-8 text-4xl font-black leading-[1.05] tracking-[-0.06em] xl:text-5xl">
          Vos copies vous <span className="text-[#d3634d]">attendent.</span>
        </h1>

        <p className="mt-8 text-lg leading-8 text-white/65 xl:text-xl xl:leading-9">
          Reconnectez-vous et reprenez là où vous en étiez. Vos classes et vos corrections sont sauvegardées.
        </p>

        <div className="mt-8 space-y-3 xl:mt-9 xl:space-y-4">
          {highlights.map((highlight) => {
            const Icon = highlight.icon

            return (
              <div key={highlight.label} className="flex items-center gap-4 text-base font-medium text-white/75">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#d3634d]">
                  <Icon className="h-4 w-4" />
                </span>
                {highlight.label}
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-sm text-white/35">© 2026 TeachAndCorrect</p>
    </aside>
  )
}
