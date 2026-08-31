import { FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CopyStatus, StudentCopy } from '@/types/copy'

type CopyDetailsCardProps = {
  copy: StudentCopy | null
  onOpenPreview: (copy: StudentCopy) => void
}

const statusStyles: Record<CopyStatus, string> = {
  'Copie corrigée': 'bg-[#edf2ee] text-[#385f49]',
  'Copie à corriger': 'bg-[#f8d7d3] text-[#b54d40]',
  'Copie corrigée en attente de validation': 'bg-[#fff0bd] text-[#8a5b1e]',
}

const shortStatusLabels: Record<CopyStatus, string> = {
  'Copie corrigée': 'Corrigée',
  'Copie à corriger': 'À corriger',
  'Copie corrigée en attente de validation': 'En attente',
}

export function CopyDetailsCard({ copy, onOpenPreview }: CopyDetailsCardProps) {
  if (!copy) {
    return (
      <aside className="flex min-h-[520px] items-center justify-center rounded-xl border border-[#dfe7df] bg-white p-8 text-center shadow-sm xl:sticky xl:top-24 xl:self-start">
        <div>
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#edf2ee] text-[#c7ded4]">
            <FileText className="h-10 w-10" />
          </div>
          <h2 className="mt-8 text-lg font-black text-[#7d987f]">Aucune copie sélectionnée</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#9aae9e]">
            Cliquez sur une ligne du tableau pour visualiser la copie ici.
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm xl:sticky xl:top-24 xl:self-start">
      <div>
        <h2 className="text-lg font-black text-[#385f49]">{copy.fileName}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-[#7d987f]">
            {copy.studentName} · {copy.className}
          </p>
          <span className={`rounded-full px-3 py-1.5 text-xs font-black ${statusStyles[copy.status]}`}>
            {shortStatusLabels[copy.status]}
          </span>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-xl bg-[#edf2ee]">
        <img src={copy.imageSrc} alt={`Aperçu de ${copy.fileName}`} className="h-72 w-full object-cover" />
        <button type="button" aria-label="Copie précédente" className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7d987f] shadow-sm">
          ‹
        </button>
        <button type="button" aria-label="Copie suivante" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7d987f] shadow-sm">
          ›
        </button>
      </div>

      <p className="mt-4 text-sm font-semibold text-[#7d987f]">
        {copy.score ?? '—'} · {copy.subject}
      </p>

      <div className="mt-5 space-y-3">
        <Button onClick={() => onOpenPreview(copy)} className="h-11 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] text-sm font-black text-[#385f49] shadow-none hover:bg-[#dfe7df]">
          Voir la copie
        </Button>
        <CopyPrimaryAction copy={copy} />
      </div>
    </aside>
  )
}

type CopyPrimaryActionProps = {
  copy: StudentCopy
}

function CopyPrimaryAction({ copy }: CopyPrimaryActionProps) {
  if (copy.status === 'Copie à corriger') {
    return (
      <Button className="h-12 w-full rounded-lg bg-[#d3634d] text-sm font-black text-white shadow-none hover:bg-[#c95540]">
        Lancer la correction IA
      </Button>
    )
  }

  if (copy.status === 'Copie corrigée en attente de validation') {
    return (
      <Button className="h-12 w-full rounded-lg bg-[#d3634d] text-sm font-black text-white shadow-none hover:bg-[#c95540]">
        Modifier et valider
      </Button>
    )
  }

  return (
    <Button className="h-12 w-full rounded-lg bg-[#d3634d] text-sm font-black text-white shadow-none hover:bg-[#c95540]">
      Modifier la copie
    </Button>
  )
}
