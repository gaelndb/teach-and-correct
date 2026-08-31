import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CopyDetailsCard } from '@/components/dashboard/copies/copy-details-card'
import { CopyPreviewModal } from '@/components/dashboard/copies/copy-preview-modal'
import { ScanButton } from '@/components/dashboard/shared/scan-button'
import { copiesStatsCards } from '@/mocks/dashboard/cards'
import { studentCopies } from '@/mocks/dashboard/copies'
import type { CopyStatus, StudentCopy } from '@/types/copy'

type CopiesScreenProps = {
  onOpenImport: () => void
}

type CopyFilter = 'Toutes' | 'À corriger' | 'À valider' | 'Corrigée'

const filters: CopyFilter[] = ['Toutes', 'À corriger', 'À valider', 'Corrigée']

const filterStatus: Partial<Record<CopyFilter, CopyStatus>> = {
  'À corriger': 'Copie à corriger',
  'À valider': 'Copie corrigée en attente de validation',
  Corrigée: 'Copie corrigée',
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

export function CopiesScreen({ onOpenImport }: CopiesScreenProps) {
  const [selectedCopy, setSelectedCopy] = useState<StudentCopy | null>(null)
  const [previewedCopy, setPreviewedCopy] = useState<StudentCopy | null>(null)
  const [search, setSearch] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<CopyFilter>('Toutes')

  const filteredCopies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const selectedStatus = filterStatus[selectedFilter]

    return studentCopies.filter((copy) => {
      const matchesSearch = !normalizedSearch || `${copy.fileName} ${copy.studentName} ${copy.subject}`
        .toLowerCase()
        .includes(normalizedSearch)
      const matchesFilter = !selectedStatus || copy.status === selectedStatus

      return matchesSearch && matchesFilter
    })
  }, [search, selectedFilter])

  return (
    <div className="px-6 py-7">
      <p className="text-sm font-semibold text-[#5f9674]">Copies</p>
      <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#385f49]">Mes copies</h1>

      <section className="mt-7 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_400px]">
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

        <section className="rounded-xl border border-[#dfe7df] bg-white shadow-sm">
          <div className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-[#385f49]">Mes copies</h2>
                <p className="mt-1 text-sm font-semibold text-[#7d987f]">Cliquez sur une copie pour la visualiser.</p>
              </div>
              <ScanButton onClick={onOpenImport} />
            </div>

            <div className="relative mt-5">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aae9e]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher par nom ou matière..."
                className="h-11 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] pl-11 pr-4 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isSelected = selectedFilter === filter

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                      isSelected
                        ? 'border-[#5f9674] bg-[#5f9674] text-white'
                        : 'border-[#dfe7df] bg-white text-[#7d987f] hover:border-[#5f9674] hover:text-[#385f49]'
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#edf2ee] text-[0.7rem] uppercase tracking-[0.14em] text-[#7d987f]">
                <tr>
                  <th className="px-6 py-4 font-black">Fichier</th>
                  <th className="px-6 py-4 font-black">Élève</th>
                  <th className="px-6 py-4 font-black">Matière</th>
                  <th className="px-6 py-4 font-black">Note</th>
                  <th className="px-6 py-4 font-black">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfe7df]">
                {filteredCopies.map((copy) => {
                  const isSelected = selectedCopy?.id === copy.id

                  return (
                    <tr
                      key={copy.id}
                      onClick={() => setSelectedCopy(copy)}
                      className={`cursor-pointer border-l-4 transition-colors hover:bg-[#f8faf6] ${
                        isSelected ? 'border-[#5f9674] bg-[#f8faf6]' : 'border-transparent bg-white'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <p className="font-black text-[#385f49]">{copy.fileName}</p>
                        <p className="mt-1 text-xs font-semibold text-[#7d987f]">{copy.importedAt}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#7d987f]">{copy.studentName}</td>
                      <td className="px-6 py-4 font-semibold text-[#7d987f]">{copy.subject}</td>
                      <td className="px-6 py-4 font-black text-[#5f9674]">{copy.score ?? '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex min-w-28 justify-center rounded-full px-4 py-1.5 text-xs font-black ${statusStyles[copy.status]}`}>
                          {shortStatusLabels[copy.status]}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <CopyDetailsCard copy={selectedCopy} onOpenPreview={setPreviewedCopy} />
      </section>

      <CopyPreviewModal copy={previewedCopy} onClose={() => setPreviewedCopy(null)} />
    </div>
  )
}
