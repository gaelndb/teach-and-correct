import type React from 'react'

import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'

type AboutPageProps = {
  onOpenContact: () => void
  onOpenLanding: () => void
  onOpenLandingSection: (sectionId: string) => void
  onOpenLogin: () => void
  onOpenSignup: () => void
}

export function AboutPage({
  onOpenContact,
  onOpenLanding,
  onOpenLandingSection,
  onOpenLogin,
  onOpenSignup,
}: AboutPageProps) {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <LandingHeader
        onOpenContact={onOpenContact}
        onOpenLanding={onOpenLanding}
        onOpenSection={onOpenLandingSection}
        onOpenLogin={onOpenLogin}
        onOpenSignup={onOpenSignup}
      />

      <section className="px-6 pb-14 pt-40 text-center lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.42em] text-[#5f9674]">À propos</p>
          <h1 className="mt-7 text-4xl font-black tracking-[-0.055em] text-[#385f49] sm:text-5xl">
            À propos de TeachAndCorrect
          </h1>
          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-[#7d987f] sm:text-xl sm:leading-9">
            Une plateforme pensée pour simplifier la correction des copies et le suivi des résultats des élèves.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <AboutSection label="La plateforme" title="Une plateforme pensée pour la correction">
          <p>
            TeachAndCorrect est une plateforme de correction de copies destinée aux enseignants. Son objectif est simple : réduire le temps consacré aux tâches répétitives de correction tout en centralisant les copies, les notes et les informations utiles au suivi des élèves.
          </p>
          <p>
            La plateforme permet d'importer une copie depuis un ordinateur ou un téléphone, d'en analyser le contenu, puis de générer une correction avec des annotations, des remarques et une note indicative. L'enseignant peut ensuite consulter le résultat, l'ajuster si nécessaire et récupérer une copie corrigée prête à être restituée.
          </p>
        </AboutSection>

        <AboutSection label="Notre objectif" title="Pourquoi TeachAndCorrect ?">
          <p>
            Corriger des copies demande du temps, en particulier lorsque le nombre d'élèves augmente ou que plusieurs évaluations doivent être traitées en parallèle.
          </p>
          <p>
            TeachAndCorrect a été pensé pour simplifier ce travail en regroupant plusieurs étapes dans une même plateforme : import des copies, analyse, correction, consultation des résultats et suivi des notes.
          </p>
          <p>
            L'objectif n'est pas seulement d'accélérer la correction, mais aussi de permettre aux enseignants de consacrer davantage de temps à l'accompagnement des élèves, à la préparation des cours et au retour pédagogique.
          </p>
        </AboutSection>

        <AboutSection label="Pour les enseignants" title="Une plateforme pensée pour les enseignants">
          <p>
            TeachAndCorrect utilise l'intelligence artificielle pour analyser les copies et préparer les éléments de correction.
          </p>
          <p>
            L'objectif est d'automatiser une partie du travail répétitif tout en laissant la possibilité à l'enseignant d'ajuster la correction.
          </p>
        </AboutSection>

        <AboutSection label="Conception" title="Des fonctionnalités pensées à partir des besoins de correction">
          <p>
            Les fonctionnalités sont développées à partir des besoins rencontrés dans le travail de correction.
          </p>
          <p>
            Les retours des enseignants jouent un rôle important dans la conception des fonctionnalités afin de construire une plateforme réellement adaptée à leur manière de travailler.
          </p>
        </AboutSection>

        <AboutSection label="En quelques mots" title="TeachAndCorrect en quelques mots" isLast>
          <p>
            TeachAndCorrect est une plateforme de correction de copies assistée par intelligence artificielle qui aide les enseignants à corriger plus rapidement, centraliser les résultats et suivre les copies de leurs élèves depuis un seul espace.
          </p>
        </AboutSection>
      </div>

      <LandingFooter onOpenContact={onOpenContact} onOpenSection={onOpenLandingSection} />
    </main>
  )
}

type AboutSectionProps = {
  children: React.ReactNode
  isLast?: boolean
  label: string
  title: string
}

function AboutSection({ children, isLast = false, label, title }: AboutSectionProps) {
  return (
    <section className={`border-t border-[#dfe7df] py-14 text-center sm:py-16 lg:py-20 ${isLast ? 'border-b-0' : ''}`}>
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.42em] text-[#7d987f]">{label}</p>
        <h2 className="mx-auto mt-6 max-w-4xl text-2xl font-black leading-tight tracking-[-0.04em] text-[#385f49] sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-10 max-w-4xl space-y-7 text-justify text-base leading-8 text-[#7d987f] sm:text-lg sm:leading-9">
          {children}
        </div>
      </div>
    </section>
  )
}
