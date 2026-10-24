import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

const questions = [
  {
    question: 'Les copies manuscrites sont-elles prises en charge ?',
    answer:
      "Oui, la plateforme est pensée pour traiter aussi bien des copies manuscrites que des fichiers numériques, à partir d'une photo ou d'un document importé.",
  },
  {
    question: 'Puis-je modifier la correction proposée ?',
    answer:
      'Oui. Les annotations, commentaires et éléments de correction peuvent être ajustés avant la validation de la correction.',
  },
  {
    question: 'Dois-je installer un logiciel ?',
    answer:
      'Non. TeachAndCorrect est accessible depuis un navigateur, sur ordinateur ou téléphone.',
  },
  {
    question: 'Puis-je utiliser TeachAndCorrect avec une classe entière ?',
    answer:
      "Oui. La plateforme est conçue pour centraliser plusieurs élèves, copies et résultats, afin de faciliter le suivi d'une classe dans le temps.",
  },
  {
    question: 'Quelles données sur les élèves sont utilisées ?',
    answer:
      'TeachAndCorrect utilise uniquement les informations nécessaires au suivi des élèves et de leurs copies, notamment leur nom, leur prénom, leur classe et les notes associées.',
  },
]

export function FaqSection() {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  function toggleQuestion(question: string) {
    setOpenQuestions((currentOpenQuestions) => {
      const nextOpenQuestions = new Set(currentOpenQuestions)

      if (nextOpenQuestions.has(question)) {
        nextOpenQuestions.delete(question)
      } else {
        nextOpenQuestions.add(question)
      }

      return nextOpenQuestions
    })
  }

  return (
    <section id="faq" className="bg-[#fbfaf6] px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-black tracking-[-0.045em] text-[#385f49] sm:text-5xl">Vous avez des questions ?</h2>
        <p className="mt-7 text-lg text-[#7d987f]">Voici les plus fréquentes. Pour toute autre demande, contactez-nous.</p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl divide-y divide-[#d7ded3]">
        {questions.map((item) => {
          const isOpen = openQuestions.has(item.question)

          return (
            <article key={item.question} className="py-8">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleQuestion(item.question)}
                className="flex w-full items-center justify-between gap-6 text-left text-xl font-black text-[#1f211f] transition hover:text-[#385f49]"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <Minus className="h-6 w-6 shrink-0 text-[#6f9674]" />
                ) : (
                  <Plus className="h-6 w-6 shrink-0 text-[#6f9674]" />
                )}
              </button>
              {isOpen ? (
                <p className="mt-7 max-w-5xl text-xl font-semibold leading-9 text-[#6f9674]">
                  {item.answer}
                </p>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
