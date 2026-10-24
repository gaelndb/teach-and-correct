import { PenLine, Send, Sparkles, Upload } from 'lucide-react'

const steps = [
  {
    title: 'Importez la copie',
    description: 'Prenez une photo avec votre téléphone ou importez un fichier depuis votre ordinateur.',
    badge: 'JPG · PNG · WEBP · PDF',
    icon: Upload,
  },
  {
    title: 'La copie est analysée',
    description: 'TeachAndCorrect lit le contenu, identifie les réponses et prépare automatiquement la correction.',
    badge: 'Manuscrit & numérique',
    icon: Sparkles,
  },
  {
    title: 'La correction est générée',
    description: 'Les annotations, remarques et éléments de correction sont générés à partir de la copie.',
    badge: 'Correction automatique',
    icon: PenLine,
  },
  {
    title: 'Récupérez la copie corrigée',
    description: "Vous obtenez une copie corrigée, prête à être consultée ou restituée à l'élève.",
    badge: 'Prête à être restituée',
    icon: Send,
  },
]

export function ProcessSection() {
  return (
    <section id="fonctionnement" className="bg-[#eef6f2] px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Fonctionnement</p>
        <h2 className="mt-7 text-4xl font-black tracking-[-0.045em] text-[#385f49] sm:text-5xl">
          Comment fonctionne TeachAndCorrect ?
        </h2>
        <p className="mt-7 text-lg text-[#7d987f]">
          Importez une copie, laissez la plateforme l'analyser et récupérez une copie corrigée, prête à être restituée.
        </p>

        <div className="relative mt-20 grid gap-12 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-11 hidden h-px bg-[#d8e5dc] md:block" />
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="relative flex flex-col items-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#385f49] p-6 text-white shadow-[0_20px_45px_rgba(56,95,73,0.25)]">
                  <Icon className="h-8 w-8" strokeWidth={2.2} />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#d3634d] text-sm font-black text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-black text-[#385f49]">{step.title}</h3>
                <p className="mt-4 max-w-xs text-base leading-7 text-[#7d987f]">{step.description}</p>
                <div className="mt-auto pt-6">
                  <span className="rounded-full border border-[#dfe7df] bg-white px-4 py-2 text-sm font-black text-[#385f49]">
                    {step.badge}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
