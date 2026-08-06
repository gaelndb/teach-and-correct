import { X, UserPlus } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { validateSignupForm } from '@/lib/authFormValidationUtils'
import type { SignupFormValues } from '@/types/auth'

type SignupModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: SignupFormValues) => void
}

const initialFormValues: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function SignupModal({ isOpen, onClose, onSubmit }: SignupModalProps) {
  const [formValues, setFormValues] = useState<SignupFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof SignupFormValues, boolean>>>({})

  const errors = useMemo(() => validateSignupForm(formValues), [formValues])
  const isFormValid = Object.keys(errors).length === 0

  if (!isOpen) {
    return null
  }

  function updateField(field: keyof SignupFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  function markFieldAsTouched(field: keyof SignupFormValues) {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }))
  }

  function getErrorMessage(field: keyof SignupFormValues) {
    if (!touchedFields[field]) {
      return null
    }

    return errors[field]
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    })

    if (!isFormValid) {
      return
    }

    onSubmit(formValues)
    setFormValues(initialFormValues)
    setTouchedFields({})
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="flex items-center justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet">Inscription</p>
            <h2 className="mt-1 text-2xl font-black text-foreground">Créer un compte professeur</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fermer la fenêtre d’inscription">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Prénom</span>
              <input
                value={formValues.firstName}
                onBlur={() => markFieldAsTouched('firstName')}
                onChange={(event) => updateField('firstName', event.target.value)}
                placeholder="Marie"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {getErrorMessage('firstName') && <p className="text-sm font-bold text-red-600">{getErrorMessage('firstName')}</p>}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Nom</span>
              <input
                value={formValues.lastName}
                onBlur={() => markFieldAsTouched('lastName')}
                onChange={(event) => updateField('lastName', event.target.value)}
                placeholder="Dupont"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {getErrorMessage('lastName') && <p className="text-sm font-bold text-red-600">{getErrorMessage('lastName')}</p>}
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-black text-foreground">Adresse email</span>
            <input
              value={formValues.email}
              onBlur={() => markFieldAsTouched('email')}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="marie.dupont@email.com"
              type="email"
              className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
            {getErrorMessage('email') && <p className="text-sm font-bold text-red-600">{getErrorMessage('email')}</p>}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Mot de passe</span>
              <input
                value={formValues.password}
                onBlur={() => markFieldAsTouched('password')}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="••••••••"
                type="password"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {getErrorMessage('password') && <p className="text-sm font-bold text-red-600">{getErrorMessage('password')}</p>}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Confirmation</span>
              <input
                value={formValues.confirmPassword}
                onBlur={() => markFieldAsTouched('confirmPassword')}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                placeholder="••••••••"
                type="password"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {getErrorMessage('confirmPassword') && <p className="text-sm font-bold text-red-600">{getErrorMessage('confirmPassword')}</p>}
            </label>
          </div>

          <Button type="submit" disabled={!isFormValid} className="w-full">
            <UserPlus className="h-5 w-5" />
            Créer mon compte
          </Button>
        </form>
      </div>
    </div>
  )
}
