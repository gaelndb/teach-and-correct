import { HelpCircle, LogOut, Search, Settings } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CopiesScreen } from '@/components/dashboard/copies-screen'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { ImportCopiesScreen } from '@/components/dashboard/import-copies-screen'
import { ScanButton } from '@/components/dashboard/scan-button'
import { StudentCopiesModal } from '@/components/dashboard/student-copies-modal'
import { StudentDetailsPanel } from '@/components/dashboard/student-details-panel'
import { StudentTable } from '@/components/dashboard/student-table'
import { Button } from '@/components/ui/button'
import { students } from '@/mocks/dashboard/students'
import type { Student } from '@/types/student'

type DashboardPageProps = {
  teacher: {
    firstName: string
    lastName: string
  } | null
  onLogout: () => void
}

const classFilters = ['Toutes', '5e B', '4e A', '3e C', '2nde B', '1ère S']
type DashboardScreen = 'students' | 'copies' | 'import'

export function DashboardPage({ teacher, onLogout }: DashboardPageProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
  const [isCopiesModalOpen, setIsCopiesModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedClassFilter, setSelectedClassFilter] = useState('Toutes')
  const [currentScreen, setCurrentScreen] = useState<DashboardScreen>('students')

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
    <main className="min-h-screen bg-[#fbfaf6] text-[#385f49]">
      <header className="sticky top-0 z-40 border-b border-[#2f4e3d] bg-[#385f49] text-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3 text-base font-black">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d3634d] text-white">
              <Settings className="h-4 w-4" />
            </span>
            TeachAndCorrect
          </div>

          <nav className="hidden items-center gap-2 text-sm font-black text-white/55 md:flex">
            <a href="#accueil" className="rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white">Accueil</a>
            <button type="button" onClick={() => setCurrentScreen('students')} className={`rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${currentScreen === 'students' ? 'bg-white/15 text-white' : ''}`}>Élèves</button>
            <button type="button" onClick={() => setCurrentScreen('copies')} className={`rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${currentScreen === 'copies' || currentScreen === 'import' ? 'bg-white/15 text-white' : ''}`}>Copies</button>
          </nav>

          <div className="flex items-center gap-2">
            <ScanButton onClick={() => setCurrentScreen('import')} />
            <Button className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 lg:inline-flex">
              <HelpCircle className="h-4 w-4" />
              Aide
            </Button>
            <Button onClick={onLogout} className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 lg:inline-flex">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
            <Button className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 xl:inline-flex">
              <Settings className="h-4 w-4" />
              {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur'}
            </Button>
          </div>
        </div>
      </header>

      {currentScreen === 'import' ? (
        <ImportCopiesScreen onStartImport={() => setCurrentScreen('import')} />
      ) : currentScreen === 'copies' ? (
        <CopiesScreen onOpenImport={() => setCurrentScreen('import')} />
      ) : (
        <div className="px-6 py-7">
        <p className="text-sm font-semibold text-[#5f9674]">Élèves</p>
        <h1 id="eleves" className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#385f49]">Mes élèves</h1>

        <section className="mt-7 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_400px]">
          <DashboardStats students={students} />

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

            <StudentTable
              students={filteredStudents}
              selectedStudentId={selectedStudent.id}
              onSelectStudent={setSelectedStudent}
            />
          </div>

          <StudentDetailsPanel
            student={selectedStudent}
            onOpenCopies={() => setIsCopiesModalOpen(true)}
          />
        </section>
        </div>
      )}

      <StudentCopiesModal
        student={selectedStudent}
        isOpen={isCopiesModalOpen}
        onClose={() => setIsCopiesModalOpen(false)}
      />
    </main>
  )
}
