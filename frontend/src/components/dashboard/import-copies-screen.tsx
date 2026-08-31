import { CheckCircle2, FileText, Pencil, QrCode, Trash2, Upload } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { copiesStatsCards, detectedCopyInformation } from '@/mocks/dashboard/cards'

type ImportCopiesScreenProps = {
  onStartImport: () => void
}

export function ImportCopiesScreen({ onStartImport }: ImportCopiesScreenProps) {
  const [importedFileName, setImportedFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleChooseFile() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setImportedFileName(file.name)
    onStartImport()
  }

  function clearImportedFile() {
    setImportedFileName(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="px-6 py-7">
      <p className="text-sm font-semibold text-[#5f9674]">Importation</p>
      <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#385f49]">Importer des copies</h1>

      <section className="mt-7 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_440px]">
        <aside className="space-y-5">
          {copiesStatsCards.map((stat) => {
            const Icon = stat.icon

            return (
              <article key={stat.label} className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black text-[#7d987f]">{stat.label}</p>
                    <p className={`mt-3 text-3xl font-black ${stat.valueClassName}`}>{stat.value}</p>
                    <p className="mt-2 text-xs font-semibold text-[#7d987f]">{stat.hint}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClassName}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            )
          })}
        </aside>

        <div className="space-y-4">
          <section className="rounded-xl border border-[#dfe7df] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-black text-[#385f49]">Importer une copie</h2>
            <p className="mt-2 text-sm font-semibold text-[#7d987f]">
              Déposez un fichier ou scannez la copie depuis votre téléphone.
            </p>

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-[#c7ded4] bg-[#edf5f1] p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#5f9674]">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-black text-[#385f49]">Glissez votre fichier ici</p>
                <p className="mt-1 text-sm font-semibold text-[#7d987f]">ou cliquez pour sélectionner</p>
                <Button onClick={handleChooseFile} className="mt-4 h-10 rounded-lg bg-[#385f49] px-5 text-sm font-black text-white shadow-none hover:bg-[#2f4e3d]">
                  Choisir un fichier
                </Button>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" className="hidden" onChange={handleFileChange} />
                <p className="mt-3 text-xs font-semibold text-[#7d987f]">JPEG · PNG · WEBP · PDF — 5 Mo max</p>
              </div>

              <div className="text-sm font-semibold text-[#7d987f]">ou</div>

              <button type="button" className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-[#c7ded4] bg-[#edf5f1] p-8 text-center transition hover:border-[#5f9674]">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#385f49]">
                  <QrCode className="h-9 w-9" />
                </div>
                <p className="mt-4 text-sm font-black text-[#385f49]">Scanner depuis votre téléphone</p>
                <p className="mt-2 text-sm font-semibold text-[#7d987f]">Photographiez directement la copie avec votre appareil</p>
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-[#c7ded4] bg-[#f4f7f2] p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#5f9674]" />
              <div>
                <h3 className="text-sm font-black text-[#385f49]">Reconnaissance automatique (OCR)</h3>
                <p className="mt-2 text-sm font-semibold text-[#7d987f]">
                  L'IA détecte le nom, le prénom, la classe et la matière inscrits sur la copie. Vérifiez et corrigez si nécessaire avant de valider.
                </p>
              </div>
            </div>
          </section>
        </div>

        <ImportedCopiesCard importedFileName={importedFileName} onClear={clearImportedFile} />
      </section>
    </div>
  )
}

type ImportedCopiesCardProps = {
  importedFileName: string | null
  onClear: () => void
}

function ImportedCopiesCard({ importedFileName, onClear }: ImportedCopiesCardProps) {
  if (!importedFileName) {
    return (
      <aside className="flex min-h-[520px] items-center justify-center rounded-xl border border-[#dfe7df] bg-white p-8 text-center shadow-sm xl:sticky xl:top-24 xl:self-start">
        <div>
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#edf2ee] text-[#c7ded4]">
            <FileText className="h-10 w-10" />
          </div>
          <h2 className="mt-8 text-lg font-black text-[#7d987f]">Aucune copie importée</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#9aae9e]">
            Importez un fichier pour afficher ici les informations détectées.
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm xl:sticky xl:top-24 xl:self-start">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[#385f49]">Copies importées</h2>
          <p className="mt-1 text-sm font-semibold text-[#7d987f]">1 copie en attente de validation</p>
        </div>
        <button type="button" onClick={onClear} aria-label="Supprimer la copie importée" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8e9e5] text-[#d3634d]">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mt-7 overflow-hidden rounded-xl bg-[#edf2ee]">
        <img src="/copie.jpg" alt="Aperçu de la copie importée" className="h-96 w-full object-cover" />
        <span className="absolute right-3 top-3 rounded-full bg-[#c8f4dc] px-3 py-1 text-xs font-black text-[#006747]">
          OCR complet
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-[#dfe7df] bg-[#edf5f1] px-4 py-3">
        <p className="text-xs font-black text-[#7d987f]">Fichier</p>
        <p className="mt-1 truncate text-sm font-black text-[#385f49]">{importedFileName}</p>
      </div>

      <h3 className="mt-7 text-sm font-black text-[#385f49]">Informations détectées</h3>
      <div className="mt-4 space-y-2">
        {detectedCopyInformation.map((information) => (
          <div key={information.label} className="flex items-center justify-between gap-4 rounded-lg border border-[#dfe7df] bg-[#edf5f1] px-4 py-3">
            <span className="text-xs font-black text-[#7d987f]">{information.label}</span>
            <span className="text-sm font-black text-[#385f49]">{information.value}</span>
            <Pencil className="h-4 w-4 text-[#7d987f]" />
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs font-semibold text-[#7d987f]">Cliquez sur ✏️ pour corriger une information mal reconnue.</p>

      <Button className="mt-5 h-11 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] text-sm font-black text-[#385f49] shadow-none hover:bg-[#dfe7df]">
        Voir toutes les copies importées
      </Button>
      <Button className="mt-3 h-12 w-full rounded-lg bg-[#d3634d] text-sm font-black text-white shadow-none hover:bg-[#c95540]">
        Valider et lancer la correction IA
      </Button>
    </aside>
  )
}
