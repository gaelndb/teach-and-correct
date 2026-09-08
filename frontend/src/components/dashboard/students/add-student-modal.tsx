import { X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

const primaryLevels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2']
const middleSchoolLevels = ['6ème', '5ème', '4ème', '3ème']
const highSchoolLevels = ['2nde', '1ère', 'Terminale']
const groups = ['A', 'B', 'C', '1', '2', '3']

type AddStudentModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AddStudentModal({ isOpen, onClose }: AddStudentModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [customGroup, setCustomGroup] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const canSubmit = useMemo(() => (
    firstName.trim().length > 0
    && lastName.trim().length > 0
    && selectedLevel !== null
  ), [firstName, lastName, selectedLevel])

  if (!isOpen) {
    return null
  }

  function closeModal() {
    onClose()
  }

  function handleSubmit() {
    if (!canSubmit) {
      return
    }

    closeModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
      <section
        aria-modal="true"
        role="dialog"
        aria-labelledby="add-student-title"
        className="w-full max-w-[440px] overflow-hidden rounded-[14px] bg-white shadow-2xl"
      >
        <header className="flex h-16 items-center justify-between bg-[#385f49] px-6 text-white">
          <h2 id="add-student-title" className="text-lg font-black">Ajouter un élève</h2>
          <button
            type="button"
            aria-label="Fermer la modale"
            onClick={closeModal}
            className="rounded-lg p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="space-y-6 px-6 py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6f7888]">Prénom</span>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Emma"
                className="h-11 w-full rounded-lg border border-[#dfe3e8] px-3 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aa1aa] focus:border-[#5f9674] focus:ring-2 focus:ring-[#5f9674]/15"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6f7888]">Nom</span>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Durand"
                className="h-11 w-full rounded-lg border border-[#dfe3e8] px-3 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aa1aa] focus:border-[#5f9674] focus:ring-2 focus:ring-[#5f9674]/15"
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6f7888]">Niveau</p>
            <LevelGroup title="Primaire" levels={primaryLevels} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />
            <LevelGroup title="Collège" levels={middleSchoolLevels} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />
            <LevelGroup title="Lycée" levels={highSchoolLevels} selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6f7888]">
              Groupe <span className="text-[#a3aab4]">(optionnel)</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                value={customGroup}
                onChange={(event) => {
                  setCustomGroup(event.target.value)
                  setSelectedGroup(null)
                }}
                placeholder="A, B, 1..."
                className="h-10 w-[90px] rounded-lg border border-[#dfe3e8] px-3 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aa1aa] focus:border-[#5f9674] focus:ring-2 focus:ring-[#5f9674]/15"
              />
              {groups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    setSelectedGroup(group)
                    setCustomGroup('')
                  }}
                  className={`h-10 min-w-9 rounded-lg border px-3 text-sm font-black transition ${
                    selectedGroup === group
                      ? 'border-[#5f9674] bg-[#edf5f1] text-[#385f49]'
                      : 'border-[#dfe3e8] bg-white text-[#4d5665] hover:border-[#5f9674] hover:text-[#385f49]'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              onClick={closeModal}
              className="h-11 rounded-lg border border-[#dfe3e8] bg-white text-sm font-black text-[#6f7888] shadow-none hover:bg-[#f8faf6]"
            >
              Annuler
            </Button>
            <Button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="h-11 rounded-lg bg-[#C8614A] text-sm font-black text-white shadow-none hover:bg-[#b95541] disabled:bg-[#c8cdd3] disabled:text-white disabled:opacity-100 disabled:hover:bg-[#c8cdd3]"
            >
              Ajouter l'élève
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

type LevelGroupProps = {
  title: string
  levels: string[]
  selectedLevel: string | null
  onSelectLevel: (level: string) => void
}

function LevelGroup({ title, levels, selectedLevel, onSelectLevel }: LevelGroupProps) {
  return (
    <div className="mt-4">
      <p className="text-xs font-black text-[#5f9674]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onSelectLevel(level)}
            className={`h-10 min-w-[62px] rounded-lg border px-4 text-sm font-black transition ${
              selectedLevel === level
                ? 'border-[#5f9674] bg-[#edf5f1] text-[#385f49]'
                : 'border-[#dfe3e8] bg-white text-[#384252] hover:border-[#5f9674] hover:text-[#385f49]'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  )
}
