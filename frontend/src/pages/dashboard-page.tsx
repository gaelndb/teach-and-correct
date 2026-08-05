import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { students } from '@/mocks/dashboard/students'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { ScanButton } from '@/components/dashboard/scan-button'
import { StudentCopiesModal } from '@/components/dashboard/student-copies-modal'
import { StudentDetailsPanel } from '@/components/dashboard/student-details-panel'
import { StudentTable } from '@/components/dashboard/student-table'
import type { Student } from '@/types/student'

type DashboardPageProps = {
  teacher: {
    firstName: string
    lastName: string
  } | null
  onBackToLanding: () => void
}

export function DashboardPage({ teacher, onBackToLanding }: DashboardPageProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
  const [isCopiesModalOpen, setIsCopiesModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return students
    }

    return students.filter((student) =>
      `${student.firstName} ${student.lastName} ${student.className}`
        .toLowerCase()
        .includes(normalizedSearch),
    )
  }, [search])

  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_left,#DBEAFE,transparent_32%),radial-gradient(circle_at_top_right,#FED7AA,transparent_30%)]" />

      <header className="border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="container flex min-h-24 flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToLanding}>
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Button>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-violet">Dashboard professeur</p>
              <h1 className="mt-1 text-3xl font-black text-foreground">
                Bonjour, {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'professeur'} 👋
              </h1>
            </div>
          </div>

          <ScanButton />
        </div>
      </header>

      <div className="container space-y-8 py-8">
        <DashboardStats students={students} />

        <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-[2rem] border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher un élève..."
                  className="h-12 w-full rounded-full border border-border bg-muted/50 pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 text-xs font-black text-muted-foreground">
                <span className="rounded-full bg-blue-100 px-3 py-2 text-primary">Toutes les classes</span>
                <span className="rounded-full bg-muted px-3 py-2">5e B</span>
                <span className="rounded-full bg-muted px-3 py-2">4e A</span>
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

      <StudentCopiesModal
        student={selectedStudent}
        isOpen={isCopiesModalOpen}
        onClose={() => setIsCopiesModalOpen(false)}
      />
    </main>
  )
}
