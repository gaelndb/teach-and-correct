import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

const questions = [
  {
    question: "L'IA attribue-t-elle automatiquement la note ?",
    answer:
      "Non. L'IA propose une correction et une note indicative, mais c'est toujours l'enseignant qui valide ou modifie le résultat avant de le restituer à l'élève. Vous gardez le contrôle total.",
  },
  {
    question: 'Quels types de copies peuvent être importés ?',
    answer:
      "Vous pouvez importer des copies scannées (PDF, JPG, PNG) ou des fichiers numériques (Word, PDF). L'outil prend en charge les copies manuscrites grâce à la reconnaissance d'écriture.",
  },
  {
    question: 'Les données des élèves sont-elles conservées ?',
    answer:
      'Les données sont chiffrées et hébergées en Europe (RGPD). Elles ne sont jamais revendues ni utilisées pour entraîner des modèles tiers. Vous pouvez supprimer vos données à tout moment.',
  },
  {
    question: "Puis-je modifier la correction proposée ?",
    answer:
      "Absolument. Chaque annotation, commentaire et note proposée est modifiable avant restitution. L'IA est un assistant, pas un décideur.",
  },
  {
    question: "TeachAndCorrect remplace-t-il la correction de l'enseignant ?",
    answer:
      "Non. L'outil amplifie votre jugement pédagogique — il accélère le travail répétitif pour vous laisser plus de temps pour le retour qualitatif. La décision finale reste toujours la vôtre.",
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
