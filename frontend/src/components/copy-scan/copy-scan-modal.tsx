import { AlertCircle, FileImage, RefreshCw, Sparkles, UploadCloud, X } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { demoCorrectionResult } from '@/mocks/copy-scan/demo-correction-result'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024

type CopyScanStatus = 'idle' | 'analyzing' | 'completed'

type CopyScanModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CopyScanModal({ isOpen, onClose }: CopyScanModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null)
  const [status, setStatus] = useState<CopyScanStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      resetScan()
    }
  }, [isOpen])

  useEffect(() => {
    if (status !== 'analyzing') {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = Math.min(currentProgress + 8, 100)

        if (nextProgress === 100) {
          window.clearInterval(intervalId)
          setStatus('completed')
        }

        return nextProgress
      })
    }, 180)

    return () => window.clearInterval(intervalId)
  }, [status])

  if (!isOpen) {
    return null
  }

  function resetScan() {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl)
    }

    setSelectedImageUrl(null)
    setSelectedImageName(null)
    setStatus('idle')
    setProgress(0)
    setErrorMessage(null)
  }

  function openFileSelector() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrorMessage('Format non accepté. Importez une image JPG, PNG ou WebP.')
      return
    }

    if (file.size > MAX_IMAGE_SIZE_IN_BYTES) {
      setErrorMessage('Le fichier est trop volumineux. La limite est de 5 Mo.')
      return
    }

    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl)
    }

    setSelectedImageUrl(URL.createObjectURL(file))
    setSelectedImageName(file.name)
    setErrorMessage(null)
    setProgress(0)
    setStatus('analyzing')
    event.target.value = ''
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet">Démo scan copie</p>
            <h2 className="mt-1 text-2xl font-black text-foreground">Essayez la correction assistée</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fermer la fenêtre de scan">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid max-h-[calc(92vh-88px)] gap-5 overflow-y-auto p-5 lg:grid-cols-[1.45fr_0.8fr]">
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            {!selectedImageUrl ? (
              <button
                type="button"
                onClick={openFileSelector}
                className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-border bg-muted/40 p-8 text-center transition hover:border-primary hover:bg-secondary/40"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <UploadCloud className="h-8 w-8" />
                </span>
                <span className="mt-5 text-xl font-black text-foreground">Importer une copie</span>
                <span className="mt-2 max-w-md text-sm font-semibold leading-6 text-muted-foreground">
                  Sélectionnez une image depuis vos fichiers ou prenez une photo depuis votre appareil mobile.
                </span>
                <span className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary shadow-sm">
                  JPG, PNG ou WebP · 5 Mo max
                </span>
              </button>
            ) : (
              <div className="rounded-[1.75rem] border border-border bg-muted/40 p-3">
                <div className="flex items-center justify-between gap-3 pb-3">
                  <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-muted-foreground">
                    <FileImage className="h-4 w-4 shrink-0" />
                    <span className="truncate">{selectedImageName}</span>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={openFileSelector}>
                    <RefreshCw className="h-4 w-4" />
                    Changer de copie
                  </Button>
                </div>
                <div className="flex max-h-[620px] items-center justify-center overflow-hidden rounded-[1.35rem] bg-white">
                  <img src={selectedImageUrl} alt="Copie importée" className="max-h-[620px] w-full object-contain" />
                </div>
              </div>
            )}

            {errorMessage && (
              <p className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </p>
            )}
          </div>

          <aside className="space-y-4 rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
            <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-700">
              Résultat de démonstration : les informations affichées sont simulées pour présenter le fonctionnement de l’outil.
            </div>
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-700">
              Pour cette démonstration, la copie n’est pas envoyée à un serveur.
            </div>

            {status === 'idle' && (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl bg-muted/40 p-5 text-center">
                <Sparkles className="h-10 w-10 text-violet" />
                <p className="mt-3 text-lg font-black text-foreground">En attente d’une copie</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  Importez une image pour lancer une analyse simulée.
                </p>
              </div>
            )}

            {status === 'analyzing' && (
              <div className="space-y-4 rounded-2xl bg-muted/40 p-5">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-secondary bg-white text-2xl font-black text-primary shadow-sm">
                  {progress}%
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent to-violet transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-center text-sm font-bold text-muted-foreground">
                  Analyse de la copie en cours...
                </p>
              </div>
            )}

            {status === 'completed' && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                  Analyse terminée
                </div>
                <div className="grid gap-3">
                  <ResultItem label="Élève" value={`${demoCorrectionResult.studentFirstName} ${demoCorrectionResult.studentLastName}`} />
                  <ResultItem label="Matière" value={demoCorrectionResult.subject} />
                  <ResultItem label="Note proposée" value={demoCorrectionResult.grade} />
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">Résumé</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{demoCorrectionResult.summary}</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

type ResultItemProps = {
  label: string
  value: string
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-black text-foreground">{value}</p>
    </div>
  )
}
