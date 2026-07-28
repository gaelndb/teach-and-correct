import { BookOpen, FileImage, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Student } from '@/types/student'

type StudentDetailsPanelProps = {
  student: Student
  onOpenCopies: () => void
}

export function StudentDetailsPanel({ student, onOpenCopies }: StudentDetailsPanelProps) {
  return (
    <Card className="sticky top-24 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary via-violet to-accent" />
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet">Détail élève</p>
            <CardTitle className="mt-2 text-2xl">
              {student.firstName} {student.lastName}
            </CardTitle>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">Classe {student.className}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-primary">
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-blue-50 p-4">
            <TrendingUp className="mb-2 h-5 w-5 text-primary" />
            <p className="text-xs font-bold text-muted-foreground">Moyenne</p>
            <p className="text-2xl font-black text-primary">{student.average}/20</p>
          </div>
          <div className="rounded-3xl bg-green-50 p-4">
            <BookOpen className="mb-2 h-5 w-5 text-success" />
            <p className="text-xs font-bold text-muted-foreground">Notes</p>
            <p className="text-2xl font-black text-success">{student.grades.length}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-black text-foreground">Notes récentes</h3>
          <div className="space-y-3">
            {student.grades.map((grade) => (
              <div key={`${grade.subject}-${grade.date}`} className="rounded-3xl border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-foreground">{grade.subject}</p>
                    <p className="text-xs text-muted-foreground">{grade.date}</p>
                  </div>
                  <p className="text-lg font-black text-primary">
                    {grade.score}/{grade.maxScore}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{grade.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={onOpenCopies} variant="secondary" className="w-full">
          <FileImage className="h-5 w-5" />
          Voir les copies
        </Button>
      </CardContent>
    </Card>
  )
}
