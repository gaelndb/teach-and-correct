import type { Student } from '@/types/student'

type StudentTableProps = {
  students: Student[]
  selectedStudentId: string
  onSelectStudent: (student: Student) => void
}

const statusStyles: Record<Student['status'], string> = {
  'À jour': 'bg-green-100 text-green-700',
  'À vérifier': 'bg-orange-100 text-orange-700',
  'En progression': 'bg-violet-100 text-violet',
}

export function StudentTable({ students, selectedStudentId, onSelectStudent }: StudentTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
      <div className="border-b border-border p-5">
        <h2 className="text-2xl font-black text-foreground">Mes élèves</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cliquez sur un élève pour consulter ses notes et ses copies.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-black">Élève</th>
              <th className="px-5 py-4 font-black">Classe</th>
              <th className="px-5 py-4 font-black">Moyenne</th>
              <th className="px-5 py-4 font-black">Dernière correction</th>
              <th className="px-5 py-4 font-black">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student) => {
              const isSelected = student.id === selectedStudentId

              return (
                <tr
                  key={student.id}
                  className={`cursor-pointer transition-colors hover:bg-blue-50 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
                  onClick={() => onSelectStudent(student)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet text-sm font-black text-white">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>
                      <div>
                        <p className="font-black text-foreground">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">ID : {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-foreground">{student.className}</td>
                  <td className="px-5 py-4 font-black text-primary">{student.average}/20</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.lastCorrection}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[student.status]}`}>
                      {student.status}
                    </span>
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
