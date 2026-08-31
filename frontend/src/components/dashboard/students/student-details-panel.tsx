import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Grade, Student } from '@/types/student'

type StudentDetailsPanelProps = {
  student: Student
  onOpenCopies: () => void
}

const filters = ['Toutes', 'Français', 'Histoire', 'Sciences']

export function StudentDetailsPanel({ student, onOpenCopies }: StudentDetailsPanelProps) {
  return (
    <aside className="rounded-xl border border-[#dfe7df] bg-white shadow-sm xl:sticky xl:top-24 xl:self-start">
      <div className="rounded-t-xl bg-[#385f49] p-5 text-white">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">Fiche élève</p>
        <div className="mt-4 flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-black text-white ${student.avatarColor}`}>
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
          <div>
            <h2 className="text-xl font-black">
              {student.firstName} {student.lastName}
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/65">Classe {student.className}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <StudentMetric label="Moyenne" value={`${student.average}/20`} />
          <StudentMetric label="Copies" value={student.grades.length} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-black text-[#385f49]">Notes récentes</h3>
          <BookOpen className="h-4 w-4 text-[#7d987f]" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full border px-3 py-1.5 text-xs font-black ${
                index === 0
                  ? 'border-[#5f9674] bg-[#5f9674] text-white'
                  : 'border-[#dfe7df] bg-white text-[#7d987f]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {student.grades.map((grade, index) => (
            <GradeCard key={`${grade.subject}-${grade.date}`} grade={grade} isOpen={index === 0} />
          ))}
        </div>

        <Button onClick={onOpenCopies} className="mt-4 h-11 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] text-sm font-black text-[#385f49] shadow-none hover:bg-[#dfe7df]">
          Voir toutes les copies
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  )
}

type StudentMetricProps = {
  label: string
  value: string | number
}

function StudentMetric({ label, value }: StudentMetricProps) {
  return (
    <div className="rounded-lg bg-white/10 p-4">
      <p className="text-xs font-black text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  )
}

type GradeCardProps = {
  grade: Grade
  isOpen: boolean
}

function GradeCard({ grade, isOpen }: GradeCardProps) {
  return (
    <article className="rounded-xl bg-[#edf2ee] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#385f49]">
            {grade.subject} <span className="text-[#5f9674]">{grade.score}/{grade.maxScore}</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-[#7d987f]">{grade.date}</p>
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4 text-[#7d987f]" /> : <ChevronRight className="h-4 w-4 text-[#7d987f]" />}
      </div>
      {isOpen ? <p className="mt-2 text-sm leading-6 text-[#7d987f]">{grade.comment}</p> : null}
    </article>
  )
}
