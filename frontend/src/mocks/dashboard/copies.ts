import type { StudentCopy } from '@/types/copy'

export const studentCopies: StudentCopy[] = [
  {
    id: 'copy-lea-bertrand-francais',
    fileName: 'Copie_Français_Léa_Bertrand',
    studentName: 'Léa Bertrand',
    className: '6ème B',
    subject: 'Français',
    score: null,
    importedAt: 'il y a 2 jours',
    status: 'Copie à corriger',
    imageSrc: '/copie.jpg',
  },
  {
    id: 'copy-nathan-petit-sciences',
    fileName: 'Copie_Sciences_Nathan_Petit',
    studentName: 'Nathan Petit',
    className: '4e A',
    subject: 'Sciences',
    score: '14,5/20',
    importedAt: 'il y a 3 jours',
    status: 'Copie corrigée en attente de validation',
    imageSrc: '/tab.png',
  },
  {
    id: 'copy-thomas-garnier-maths',
    fileName: 'Copie_Maths_Thomas_Garnier',
    studentName: 'Thomas Garnier',
    className: '3e C',
    subject: 'Mathématiques',
    score: '9,5/20',
    importedAt: 'il y a 6 jours',
    status: 'Copie corrigée',
    imageSrc: '/tab2.png',
  },
]
