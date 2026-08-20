import { Camera, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

type HeroSectionProps = {
  onOpenCopyScan: () => void
}

export function HeroSection({ onOpenCopyScan }: HeroSectionProps) {
  return (
    <section id="accueil" className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44 lg:pb-32">
      <div className="absolute left-1/2 top-24 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl animate-glow" />
      <div className="absolute -left-24 bottom-12 -z-10 h-72 w-72 rounded-full bg-success/20 blur-3xl" />
      <div className="absolute -right-24 top-20 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute inset-x-0 top-0 -z-20 h-[520px] bg-[radial-gradient(circle_at_top_left,#DBEAFE,transparent_34%),radial-gradient(circle_at_top,#DCFCE7,transparent_30%),radial-gradient(circle_at_top_right,#FED7AA,transparent_28%),linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)]" />

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Correction IA pour les enseignants
          </div>

          <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Corrigez vos copies{' '}
            <span className="bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent">
              en quelques secondes.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Prenez une photo, l’IA analyse, corrige et propose une note détaillée.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="relative w-full sm:w-auto">
              <span className="absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse" />
              <Button size="lg" onClick={onOpenCopyScan} className="relative w-full bg-gradient-to-r from-accent to-violet hover:from-orange-600 hover:to-violet sm:w-auto">
                <Camera className="h-5 w-5" />
                Scanner une copie
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
