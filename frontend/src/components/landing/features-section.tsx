import type React from 'react'
import { BarChart3, Check, Sparkles } from 'lucide-react'

const correctionBenefits = [
  'Scan, photo ou fichier numérique acceptés',
  "L'IA annote la copie directement — surlignages, commentaires en marge",
  "Une zone dédiée pour modifier chaque annotation de l'IA",
  'Vos modifications se répercutent immédiatement sur la copie',
  "Note indicative proposée, à valider par l'enseignant",
]

const studentBenefits = [
  'Historique complet des copies par élève',
  'Moyenne et tendances par matière',
  'Identification rapide des élèves en difficulté',
  'Vue globale par classe, tout centralisé',
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="bg-[#fbfaf6] px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">Fonctionnalités</p>
          <h2 className="mt-7 text-4xl font-black tracking-[-0.045em] text-[#385f49] sm:text-5xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#7d987f]">
            Une seule plateforme pour corriger vos copies et suivre la progression de vos élèves.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Correction assistée par l'IA"
            subtitle="L'IA annote directement sur la copie"
            imageSrc="/tab2.png"
            imageAlt="Aperçu d'une copie annotée par l'IA"
            benefits={correctionBenefits}
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Suivi des élèves"
            subtitle="Historique, tendances, alertes"
            imageSrc="/tab.png"
            imageAlt="Tableau de suivi des élèves"
            benefits={studentBenefits}
          />
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  benefits: string[]
}

function FeatureCard({ icon, title, subtitle, imageSrc, imageAlt, benefits }: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-[#dfe7df] bg-white p-7 shadow-[0_24px_70px_rgba(56,95,73,0.08)] sm:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5ef] text-[#5f9674]">
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-black tracking-[-0.025em] text-[#385f49]">{title}</h3>
      <p className="mt-3 text-base text-[#7d987f]">{subtitle}</p>

      <div className="mt-7 overflow-hidden rounded-2xl bg-[#f8faf6]">
        <img src={imageSrc} alt={imageAlt} className="w-full object-cover" />
      </div>

      <ul className="mt-7 space-y-4 text-base leading-7 text-[#7d987f]">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-[#5f9674]" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
