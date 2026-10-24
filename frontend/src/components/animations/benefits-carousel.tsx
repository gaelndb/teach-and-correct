import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const SLIDE_DURATION_MS = 6000
const SLIDE_TRANSITION_DURATION_SECONDS = 0.6

const slides = [
  {
    title: 'Traitez plus de copies',
    description: "Ne passez plus des heures à corriger manuellement. TeachAndCorrect vous aide à traiter davantage de copies, même lorsque le nombre d'élèves est élevé ou que la charge de travail augmente.",
    image: '/teacher_correcting_assignment.webp',
    alt: 'Enseignante corrigeant des copies',
  },
  {
    title: 'Consacrez plus de temps aux élèves',
    description: "Réduisez le temps consacré à la correction pour vous concentrer davantage sur l'accompagnement des élèves, les explications en classe et la préparation des cours.",
    image: '/teacher_helping_student.webp',
    alt: 'Enseignant accompagnant un élève en classe',
  },
  {
    title: 'Vos données sont protégées',
    description: "TeachAndCorrect limite l'utilisation des données aux informations nécessaires au fonctionnement du service.",
    image: '/datas_security.webp',
    alt: 'Ordinateur illustrant la protection des données',
  },
]

export function BenefitsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = Boolean(shouldReduceMotion)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentSlide((slide) => (slide + 1) % slides.length)
    }, SLIDE_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [currentSlide])

  const slide = slides[currentSlide]

  return (
    <div
      className="mx-auto w-full max-w-6xl"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Bénéfices de TeachAndCorrect"
    >
      <div className="relative h-[450px] overflow-hidden sm:h-[470px] md:h-[350px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.article
            key={slide.title}
            className="absolute inset-0 grid content-center items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-12"
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${currentSlide + 1} sur ${slides.length}`}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -80 }}
            transition={{
              duration: reduceMotion ? 0.2 : SLIDE_TRANSITION_DURATION_SECONDS,
              ease: 'easeInOut',
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-56 w-full rounded-2xl object-cover sm:h-64 md:h-80"
            />
            <div className="text-left">
              <h3 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                {slide.description}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {slides.map((carouselSlide, index) => (
          <button
            key={carouselSlide.title}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className="flex h-6 items-center justify-center"
            aria-label={`Afficher le bénéfice ${index + 1} : ${carouselSlide.title}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          >
            <motion.span
              className="block h-2 rounded-full"
              animate={{
                width: index === currentSlide ? 28 : 8,
                backgroundColor: index === currentSlide ? '#d3634d' : 'rgba(223, 231, 223, 0.45)',
              }}
              transition={{ duration: reduceMotion ? 0.2 : 0.3 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
