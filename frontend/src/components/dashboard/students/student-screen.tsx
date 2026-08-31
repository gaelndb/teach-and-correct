import { ChevronRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { students } from '@/mocks/dashboard/students'
import type { Student } from '@/types/student'
import { StudentCopiesModal } from './student-copies-modal'
import { StudentDetailsPanel } from './student-details-panel'
import { StudentStats } from './student-stats'

const classFilters = ['Toutes', '5e B', '4e A', '3e C', '2nde B', '1ère S']

const statusStyles: Record<Student['status'], string> = {
  'Copie corrigée': 'bg-[#c8f4dc] text-[#385f49]',
  'Copie à corriger': 'bg-[#f8d7d3] text-[#b54d40]',
  'Copie corrigée en attente de validation': 'bg-[#fff0bd] text-[#8a5b1e]',
}

export function StudentScreen() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
  const [isCopiesModalOpen, setIsCopiesModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedClassFilter, setSelectedClassFilter] = useState('Toutes')

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch = !normalizedSearch || `${student.firstName} ${student.lastName} ${student.className}`
        .toLowerCase()
        .includes(normalizedSearch)
      const matchesClass = selectedClassFilter === 'Toutes' || student.className === selectedClassFilter

      return matchesSearch && matchesClass
    })
  }, [search, selectedClassFilter])

  return (
    <div className="px-6 py-7">
      <p className="text-sm font-semibold text-[#5f9674]">Élèves</p>
      <h1 id="eleves" className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#385f49]">Mes élèves</h1>

      <section className="mt-7 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_400px]">
        <StudentStats students={students} />

        <div className="rounded-xl border border-[#dfe7df] bg-white shadow-sm">
          <div className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-[#385f49]">Mes élèves</h2>
                <p className="mt-1 text-sm font-semibold text-[#7d987f]">Cliquez sur un élève pour consulter ses notes et ses copies.</p>
              </div>
              <Button className="h-10 rounded-lg bg-[#d3634d] px-5 text-sm font-black text-white shadow-none hover:bg-[#c95540]">
                + Ajouter un élève
              </Button>
            </div>

            <div className="relative mt-5">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aae9e]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un élève..."
                className="h-11 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] pl-11 pr-4 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {classFilters.map((classFilter) => {
                const isSelected = selectedClassFilter === classFilter

                return (
                  <button
                    key={classFilter}
                    type="button"
                    onClick={() => setSelectedClassFilter(classFilter)}
                    className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                      isSelected
                        ? 'border-[#5f9674] bg-[#5f9674] text-white'
                        : 'border-[#dfe7df] bg-white text-[#7d987f] hover:border-[#5f9674] hover:text-[#385f49]'
                    }`}
                  >
                    {classFilter}
                  </button>
                )
              })}
            </div>
          </div>

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
                  {filteredStudents.map((student) => {
                    const isSelected = student.id === selectedStudent.id

                    return (
                      <tr
                        key={student.id}
                        className={`cursor-pointer border-l-4 transition-colors hover:bg-[#f8faf6] ${
                          isSelected ? 'border-[#5f9674] bg-[#f8faf6]' : 'border-transparent bg-white'
                        }`}
                        onClick={() => setSelectedStudent(student)}
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
        </div>

        <StudentDetailsPanel
          student={selectedStudent}
          onOpenCopies={() => setIsCopiesModalOpen(true)}
        />
      </section>

      <StudentCopiesModal
        student={selectedStudent}
        isOpen={isCopiesModalOpen}
        onClose={() => setIsCopiesModalOpen(false)}
      />
    </div>
  )
}
