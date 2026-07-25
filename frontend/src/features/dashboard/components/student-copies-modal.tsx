import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Student } from '@/features/dashboard/types/student'

type StudentCopiesModalProps = {
  student: Student
  isOpen: boolean
  onClose: () => void
}

export function StudentCopiesModal({ student, isOpen, onClose }: StudentCopiesModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-accent">Copies scannées</p>
            <h2 className="mt-1 text-2xl font-black text-foreground">
              {student.firstName} {student.lastName}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fermer la fenêtre">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid max-h-[78vh] gap-6 overflow-y-auto p-5 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img
              src="/copie.jpg"
              alt={`Copie corrigée de ${student.firstName} ${student.lastName}`}
              className="h-full w-full object-contain"
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-blue-50 p-5">
              <p className="text-sm font-bold text-muted-foreground">Correction IA</p>
              <p className="mt-2 text-4xl font-black text-primary">15/20</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Copie analysée automatiquement. La note et les remarques peuvent être ajustées par le professeur.
              </p>
            </div>

            <div className="rounded-3xl bg-orange-50 p-5">
              <p className="font-black text-foreground">Remarques</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• Sujet globalement compris.</li>
                <li>• Quelques imprécisions dans les dates.</li>
                <li>• Expression écrite à renforcer.</li>
              </ul>
            </div>

            <Button className="w-full" onClick={onClose}>
              Valider la correction
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}
