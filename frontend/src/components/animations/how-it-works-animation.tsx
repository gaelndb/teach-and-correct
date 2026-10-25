import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import laptopWithPaper from '@/assets/laptop-with-paper.svg'
import loadingBar from '@/assets/loading_bar.svg'
import loadingBarEmpty from '@/assets/loading_bar_empty.svg'
import paperCorrected from '@/assets/paper_corrected.svg'
import phoneWithPaper from '@/assets/phone-with-paper.svg'
import spinner from '@/assets/spinner.svg'
import teacherPrintingPaper from '@/assets/teacher_printing_paper.svg'

const SCENE_DISPLAY_DURATION_MS = 2000
const ANALYSIS_SCENE_DISPLAY_DURATION_MS = 1800
const ANALYSIS_PROGRESS_DURATION_SECONDS = 1.5
const SCENE_TRANSITION_DURATION_SECONDS = 0.6
const REDUCED_MOTION_TRANSITION_DURATION_SECONDS = 0.2

const scenes = [
  { title: 'Importez la copie' },
  { title: 'La copie est analysée' },
  { title: 'La correction est générée' },
  { title: 'Récupérez la copie corrigée' },
]

function ImportScene() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 sm:gap-10 lg:gap-14">
      <img
        src={laptopWithPaper}
        alt="Ordinateur affichant une copie d'élève importée"
        className="max-h-[180px] w-[68%] max-w-lg object-contain sm:max-h-[235px] sm:w-[64%]"
      />
      <img
        src={phoneWithPaper}
        alt="Téléphone affichant une copie d'élève photographiée"
        className="max-h-[140px] w-[21%] max-w-36 object-contain sm:max-h-[195px] sm:w-[19%]"
      />
    </div>
  )
}

function AnalysisScene({ reduceMotion }: { reduceMotion: boolean }) {
  const progressDelay = reduceMotion
    ? REDUCED_MOTION_TRANSITION_DURATION_SECONDS
    : SCENE_TRANSITION_DURATION_SECONDS

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <motion.img
        src={spinner}
        alt=""
        className="h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 1.2, ease: 'linear', repeat: Infinity }}
      />
      <div className="relative mt-8 h-[18px] w-full max-w-[340px] overflow-hidden sm:max-w-[420px]">
        <img src={loadingBarEmpty} alt="" className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <motion.img
          src={loadingBar}
          alt=""
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{
            duration: ANALYSIS_PROGRESS_DURATION_SECONDS,
            delay: progressDelay,
            ease: 'easeInOut',
          }}
        />
      </div>
      <p className="mt-4 text-sm font-semibold text-[#7d987f] sm:text-base">Analyse en cours…</p>
    </div>
  )
}

function CorrectionScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={paperCorrected}
        alt="Copie d'élève corrigée avec annotations"
        className="h-[calc(100%-0.5rem)] w-[95%] -translate-y-1 object-contain drop-shadow-[0_14px_18px_rgba(56,95,73,0.12)]"
      />
    </div>
  )
}

function RetrievalScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={teacherPrintingPaper}
        alt="Enseignante récupérant une copie corrigée depuis son ordinateur"
        className="max-h-[200px] w-full max-w-xl object-contain sm:max-h-[250px]"
      />
    </div>
  )
}

function SceneContent({ currentScene, reduceMotion }: { currentScene: number; reduceMotion: boolean }) {
  switch (currentScene) {
    case 0:
      return <ImportScene />
    case 1:
      return <AnalysisScene reduceMotion={reduceMotion} />
    case 2:
      return <CorrectionScene />
    case 3:
      return <RetrievalScene />
    default:
      return null
  }
}

type HowItWorksAnimationProps = {
  onSceneChange?: (scene: number) => void
}

export function HowItWorksAnimation({ onSceneChange }: HowItWorksAnimationProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const hasTransitioned = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = Boolean(shouldReduceMotion)
  const transitionDuration = reduceMotion
    ? REDUCED_MOTION_TRANSITION_DURATION_SECONDS
    : SCENE_TRANSITION_DURATION_SECONDS

  useEffect(() => {
    const transitionDelay = hasTransitioned.current ? transitionDuration * 1000 : 0
    const displayDuration = currentScene === 1
      ? ANALYSIS_SCENE_DISPLAY_DURATION_MS
      : SCENE_DISPLAY_DURATION_MS
    const timeoutId = window.setTimeout(() => {
      const nextScene = (currentScene + 1) % scenes.length
      hasTransitioned.current = true
      setCurrentScene(nextScene)
      onSceneChange?.(nextScene)
    }, displayDuration + transitionDelay)

    return () => window.clearTimeout(timeoutId)
  }, [currentScene, onSceneChange, transitionDuration])

  return (
    <div
      className="mx-auto mt-12 flex h-[350px] w-full max-w-[52rem] flex-col overflow-hidden rounded-3xl border border-[#d8e5dc] bg-[#fbfaf6] px-5 py-6 shadow-[0_18px_50px_rgba(56,95,73,0.05)] sm:h-[385px] sm:px-10 sm:py-8"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Les quatre étapes de fonctionnement de TeachAndCorrect"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.article
            key={currentScene}
            className="absolute inset-0 flex flex-col text-left"
            role="group"
            aria-roledescription="diapositive"
            aria-label={`Étape ${currentScene + 1} sur ${scenes.length}`}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -90 }}
            transition={{ duration: transitionDuration, ease: 'easeInOut' }}
          >
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d3634d] text-sm font-black text-white sm:h-11 sm:w-11 sm:text-base">
                {currentScene + 1}
              </span>
              <h3 className="text-lg font-black text-[#385f49] sm:text-2xl">
                {scenes[currentScene].title}
              </h3>
            </div>

            <div className="mt-3 min-h-0 w-full flex-1 sm:mt-4">
              <SceneContent currentScene={currentScene} reduceMotion={reduceMotion} />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex h-5 shrink-0 items-center justify-center gap-1">
        {scenes.map((scene, index) => (
          <button
            key={scene.title}
            type="button"
            className="flex h-6 items-center justify-center px-1"
            onClick={() => {
              if (index !== currentScene) {
                hasTransitioned.current = true
                setCurrentScene(index)
                onSceneChange?.(index)
              }
            }}
            aria-label={`Afficher l'étape ${index + 1} : ${scene.title}`}
            aria-current={index === currentScene ? 'step' : undefined}
          >
            <motion.span
              className="block h-2 rounded-full"
              animate={{
                width: index === currentScene ? 28 : 8,
                backgroundColor: index === currentScene ? '#385f49' : '#d8e5dc',
              }}
              transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
