import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const SLIDE_DISPLAY_DURATION_MS = 3800
const SLIDE_TRANSITION_DURATION_SECONDS = 0.6

const trackingSlides = [
  {
    src: '/students_grades_tracking.png',
    alt: 'Interface Mes élèves avec les notes et les statuts des copies',
  },
  {
    src: '/copies_tracking.png',
    alt: 'Interface Mes copies avec les matières, les notes et les états de correction',
  },
]

export function StudentTrackingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const hasStarted = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const transitionDuration = shouldReduceMotion ? 0.2 : SLIDE_TRANSITION_DURATION_SECONDS

  useEffect(() => {
    const transitionDelay = hasStarted.current ? transitionDuration * 1000 : 0
    const timeoutId = window.setTimeout(() => {
      hasStarted.current = true
      setCurrentSlide((slide) => (slide + 1) % trackingSlides.length)
    }, SLIDE_DISPLAY_DURATION_MS + transitionDelay)

    return () => window.clearTimeout(timeoutId)
  }, [currentSlide, transitionDuration])

  const slide = trackingSlides[currentSlide]

  return (
    <div
      className="w-full"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Aperçu du suivi des élèves et des copies"
    >
      <div className="relative aspect-[1718/1098] w-full overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(56,95,73,0.10)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -80 }}
            transition={{ duration: transitionDuration, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {trackingSlides.map((trackingSlide, index) => (
          <motion.span
            key={trackingSlide.src}
            className="h-2 rounded-full"
            animate={{
              width: index === currentSlide ? 22 : 8,
              backgroundColor: index === currentSlide ? '#5f9674' : 'rgba(95, 150, 116, 0.28)',
            }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
