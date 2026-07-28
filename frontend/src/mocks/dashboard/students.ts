import type { Student } from '@/types/student'

export const students: Student[] = [
  {
    id: 'lea-martin',
    firstName: 'Léa',
    lastName: 'Martin',
    className: '5e B',
    average: 15.2,
    lastCorrection: 'Il y a 2 jours',
    status: 'À jour',
    grades: [
      { subject: 'Français', score: 16, maxScore: 20, date: '18/07/2026', comment: 'Très bonne argumentation.' },
      { subject: 'Histoire', score: 15, maxScore: 20, date: '12/07/2026', comment: 'Réponses claires, quelques imprécisions.' },
      { subject: 'Mathématiques', score: 14.5, maxScore: 20, date: '05/07/2026', comment: 'Méthode comprise.' },
    ],
  },
  {
    id: 'lucas-bernard',
    firstName: 'Lucas',
    lastName: 'Bernard',
    className: '5e B',
    average: 11.4,
    lastCorrection: 'Hier',
    status: 'À vérifier',
    grades: [
      { subject: 'Français', score: 10, maxScore: 20, date: '19/07/2026', comment: 'Attention à la structure des réponses.' },
      { subject: 'Histoire', score: 12, maxScore: 20, date: '13/07/2026', comment: 'Des connaissances mais manque de précision.' },
      { subject: 'Sciences', score: 12.2, maxScore: 20, date: '02/07/2026', comment: 'Efforts visibles.' },
    ],
  },
  {
    id: 'emma-durand',
    firstName: 'Emma',
    lastName: 'Durand',
    className: '4e A',
    average: 13.8,
    lastCorrection: 'Il y a 5 jours',
    status: 'En progression',
    grades: [
      { subject: 'Histoire', score: 14, maxScore: 20, date: '16/07/2026', comment: 'Bonne compréhension du sujet.' },
      { subject: 'Français', score: 13.5, maxScore: 20, date: '08/07/2026', comment: 'Expression écrite à améliorer.' },
      { subject: 'Anglais', score: 14, maxScore: 20, date: '01/07/2026', comment: 'Bon vocabulaire.' },
    ],
  },
  {
    id: 'nathan-petit',
    firstName: 'Nathan',
    lastName: 'Petit',
    className: '4e A',
    average: 16.1,
    lastCorrection: 'Aujourd’hui',
    status: 'À jour',
    grades: [
      { subject: 'Mathématiques', score: 17, maxScore: 20, date: '20/07/2026', comment: 'Excellent raisonnement.' },
      { subject: 'Histoire', score: 16, maxScore: 20, date: '14/07/2026', comment: 'Réponse bien organisée.' },
      { subject: 'Français', score: 15.5, maxScore: 20, date: '04/07/2026', comment: 'Très bon niveau général.' },
    ],
  },
  {
    id: 'ines-moreau',
    firstName: 'Inès',
    lastName: 'Moreau',
    className: '3e C',
    average: 12.6,
    lastCorrection: 'Il y a 1 semaine',
    status: 'En progression',
    grades: [
      { subject: 'Histoire', score: 13, maxScore: 20, date: '11/07/2026', comment: 'Progression encourageante.' },
      { subject: 'Français', score: 12, maxScore: 20, date: '06/07/2026', comment: 'Faire des phrases plus complètes.' },
      { subject: 'Sciences', score: 12.8, maxScore: 20, date: '30/06/2026', comment: 'Notions principales acquises.' },
    ],
  },
]
