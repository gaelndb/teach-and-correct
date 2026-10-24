import { HeroAnimation } from '@/components/animations/hero-animation'
import { Button } from '@/components/ui/button'

type HeroSectionProps = {
  onOpenSignup: () => void
}

export function HeroSection({ onOpenSignup }: HeroSectionProps) {
  return (
    <section id="accueil" className="bg-[#385f49] px-6 pb-28 pt-44 text-white lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Corrigez les copies d'élèves <span className="text-[#d3634d]">automatiquement</span>
        </h1>

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">
          TeachAndCorrect permet aux enseignants d'importer une copie d'élève et d'en obtenir une version corrigée.
        </p>

        <Button
          size="lg"
          onClick={onOpenSignup}
          className="mt-12 h-16 rounded-xl bg-[#d3634d] px-12 text-lg text-white shadow-none hover:bg-[#c95540]"
        >
          Essayer maintenant
        </Button>

        <HeroAnimation />
      </div>
    </section>
  )
}
