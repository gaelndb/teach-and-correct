import { CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileText, Users } from 'lucide-react'

import type { Student } from '@/types/student'

type DashboardStatsProps = {
  students: Student[]
}

export function DashboardStats({ students }: DashboardStatsProps) {
  const classAverage = students.reduce((total, student) => total + student.average, 0) / students.length
  const correctedCopies = 87
  const correctionsToReview = students.filter((student) => student.status === 'Copie à corriger').length

  const stats = [
    {
      label: 'Élèves suivis',
      value: students.length,
      hint: 'dans toutes vos classes',
      icon: Users,
      iconClassName: 'bg-[#eef2ee] text-[#385f49]',
    },
    {
      label: 'Copies corrigées',
      value: correctedCopies,
      hint: 'ce mois-ci',
      icon: CheckCircle2,
      iconClassName: 'bg-[#edf5f1] text-[#5f9674]',
    },
    {
      label: 'Copies à corriger',
      value: correctionsToReview,
      hint: 'en attente de révision',
      icon: Clock3,
      iconClassName: 'bg-[#f8e9e5] text-[#d3634d]',
      valueClassName: 'text-[#d3634d]',
    },
  ]

  return (
    <aside className="space-y-5">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <article key={stat.label} className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#7d987f]">{stat.label}</p>
                <p className={`mt-3 text-3xl font-black text-[#5f9674] ${stat.valueClassName ?? ''}`}>{stat.value}</p>
                <p className="mt-2 text-xs font-semibold text-[#7d987f]">{stat.hint}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClassName}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </article>
        )
      })}

      <article className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-[#7d987f]">Moyenne par classe</p>
            <p className="mt-3 text-3xl font-black text-[#5f9674]">{classAverage.toFixed(1)}/20</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-black text-[#7d987f]">
              <span className="rounded-full bg-[#edf5f1] px-2 py-1 text-[#385f49]">3e C</span>
              <span>2 élèves</span>
            </div>
          </div>
          <FileText className="h-5 w-5 text-[#5f9674]" />
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button type="button" aria-label="Classe précédente" className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#dfe7df] text-[#7d987f]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Classe suivante" className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#dfe7df] text-[#7d987f]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </article>
    </aside>
  )
}
