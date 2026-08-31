import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { StudentCopy } from '@/types/copy'

type CopyPreviewModalProps = {
  copy: StudentCopy | null
  onClose: () => void
}

export function CopyPreviewModal({ copy, onClose }: CopyPreviewModalProps) {
  if (!copy) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-[#dfe7df] px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-[#385f49]">{copy.fileName}</h2>
            <p className="mt-1 text-sm font-semibold text-[#7d987f]">
              {copy.studentName} · {copy.subject}
            </p>
          </div>
          <Button onClick={onClose} className="h-10 w-10 rounded-lg border border-[#dfe7df] bg-white p-0 text-[#385f49] shadow-none hover:bg-[#edf5f1]" aria-label="Fermer l’aperçu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="max-h-[78vh] overflow-auto bg-[#edf2ee] p-4">
          <img src={copy.imageSrc} alt={`Aperçu de ${copy.fileName}`} className="mx-auto max-h-[74vh] rounded-xl object-contain" />
        </div>
      </div>
    </div>
  )
}
