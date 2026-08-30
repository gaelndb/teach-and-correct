import { Expand, Pause, Play, Sparkles, Volume2 } from 'lucide-react'

export function VideoPlayerSection() {
  return (
    <section className="bg-[#fbfaf6] px-6 pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#385f49] shadow-[0_32px_90px_rgba(56,95,73,0.18)]">
        <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-[#263b2f] sm:h-[440px] lg:h-[520px]">
          <img src="/copie.jpg" alt="Aperçu vidéo de démonstration" className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#203b2d]/35" />
          <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-sm font-black text-white backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Premium
          </div>
          <button
            type="button"
            aria-label="Lancer la vidéo de démonstration"
            className="absolute flex h-28 w-28 items-center justify-center rounded-full bg-[#d3634d] text-white shadow-[0_22px_60px_rgba(211,99,77,0.35)] transition hover:scale-105 hover:bg-[#c95540]"
          >
            <Play className="ml-1 h-12 w-12" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex items-center gap-5 bg-[#385f49] px-6 py-6 text-white sm:px-8">
          <button type="button" aria-label="Mettre en pause" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#6aa680]">
            <Pause className="h-6 w-6" />
          </button>
          <span className="hidden text-sm font-bold sm:inline">01:24</span>
          <span className="hidden text-sm text-white/55 sm:inline">/ 08:30</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/35">
            <div className="h-full w-[58%] bg-white" />
          </div>
          <Volume2 className="hidden h-6 w-6 sm:block" />
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-white/35 sm:block">
            <div className="h-full w-[62%] bg-white" />
          </div>
          <button type="button" aria-label="Agrandir" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/15">
            <Expand className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
