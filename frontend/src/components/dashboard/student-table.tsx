import { ChevronRight } from 'lucide-react'

import type { Student } from '@/types/student'

type StudentTableProps = {
  students: Student[]
  selectedStudentId: string
  onSelectStudent: (student: Student) => void
}

const statusStyles: Record<Student['status'], string> = {
  'Copie corrigée': 'bg-[#c8f4dc] text-[#385f49]',
  'Copie à corriger': 'bg-[#f8d7d3] text-[#b54d40]',
  'Copie corrigée en attente de validation': 'bg-[#fff0bd] text-[#8a5b1e]',
}

export function StudentTable({ students, selectedStudentId, onSelectStudent }: StudentTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dfe7df] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#edf2ee] text-[0.7rem] uppercase tracking-[0.14em] text-[#7d987f]">
            <tr>
              <th className="px-6 py-4 font-black">Élève</th>
              <th className="px-6 py-4 font-black">Classe</th>
              <th className="px-6 py-4 font-black">Moyenne</th>
              <th className="px-6 py-4 font-black">Dernière copie</th>
              <th className="px-6 py-4 font-black">Statut</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe7df]">
            {students.map((student) => {
              const isSelected = student.id === selectedStudentId

              return (
                <tr
                  key={student.id}
                  className={`cursor-pointer border-l-4 transition-colors hover:bg-[#f8faf6] ${
                    isSelected ? 'border-[#5f9674] bg-[#f8faf6]' : 'border-transparent bg-white'
                  }`}
                  onClick={() => onSelectStudent(student)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white ${student.avatarColor}`}>
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>
                      <p className="font-black text-[#385f49]">
                        {student.firstName} {student.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#7d987f]">{student.className}</td>
                  <td className={`px-6 py-4 font-black ${student.average < 10 ? 'text-[#d3634d]' : 'text-[#385f49]'}`}>{student.average}/20</td>
                  <td className="px-6 py-4 font-semibold text-[#7d987f]">{student.lastCorrection}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex min-w-28 justify-center rounded-full px-4 py-1.5 text-xs font-black ${statusStyles[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#9aae9e]">
                    <ChevronRight className="h-4 w-4" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
