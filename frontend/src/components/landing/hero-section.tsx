import { Button } from '@/components/ui/button'

type HeroSectionProps = {
  onOpenSignup: () => void
}

export function HeroSection({ onOpenSignup }: HeroSectionProps) {
  return (
    <section id="accueil" className="bg-[#385f49] px-6 pb-28 pt-44 text-white lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/85">
          <span className="h-2 w-2 rounded-full bg-[#d3634d]" />
          Conçu pour les enseignants
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Corrigez vos copies <span className="text-[#d3634d]">plus vite avec l'IA</span>, restez décisionnaire
        </h1>

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">
          Importez une copie, l'IA l'annote directement. Relisez, ajustez chaque commentaire, puis restituez à l'élève.
        </p>

        <Button
          size="lg"
          onClick={onOpenSignup}
          className="mt-12 h-16 rounded-xl bg-[#d3634d] px-12 text-lg text-white shadow-none hover:bg-[#c95540]"
        >
          Essayer gratuitement
        </Button>
      </div>
    </section>
  )
}
