export type Grade = {
  subject: string
  score: number
  maxScore: number
  date: string
  comment: string
}

export type Student = {
  id: string
  firstName: string
  lastName: string
  className: string
  average: number
  lastCorrection: string
  status: 'À jour' | 'À vérifier' | 'En progression'
  grades: Grade[]
}
