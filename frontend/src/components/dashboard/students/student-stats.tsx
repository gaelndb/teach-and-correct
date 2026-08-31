import { ChevronLeft, ChevronRight } from 'lucide-react'

import { studentsStatsCards } from '@/mocks/dashboard/cards'
import type { Student } from '@/types/student'

type StudentStatsProps = {
  students: Student[]
}

export function StudentStats({ students }: StudentStatsProps) {
  const classAverage = students.reduce((total, student) => total + student.average, 0) / students.length
  const classNames = Array.from(new Set(students.map((student) => student.className)))

  const statsValues = {
    classAverage: `${classAverage.toFixed(1)}/20`,
    totalStudents: students.length,
    totalClasses: classNames.length,
  }

  const [averageCard, ...statsCards] = studentsStatsCards
  const AverageIcon = averageCard.icon

  return (
    <aside className="space-y-5">
      <article className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-[#7d987f]">{averageCard.label}</p>
            <p className={`mt-3 text-3xl font-black ${averageCard.valueClassName}`}>{statsValues[averageCard.key]}</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-black text-[#7d987f]">
              <span className="rounded-full bg-[#edf5f1] px-2 py-1 text-[#385f49]">Toutes</span>
              <span>{classNames.length} {averageCard.hint}</span>
            </div>
          </div>
          <AverageIcon className={`h-5 w-5 ${averageCard.iconClassName}`} />
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

      {statsCards.map((stat) => {
        const Icon = stat.icon

        return (
          <article key={stat.label} className="rounded-xl border border-[#dfe7df] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#7d987f]">{stat.label}</p>
                <p className={`mt-3 text-3xl font-black ${stat.valueClassName}`}>{statsValues[stat.key]}</p>
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
  )
}
