import { FormEvent, useMemo, useState } from 'react'
import { LogIn, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { LoginFormValues } from '@/types/auth'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: LoginFormValues) => void
}

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
}

function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!values.email.trim()) {
    errors.email = 'L’adresse email est obligatoire.'
  } else if (!values.email.includes('@')) {
    errors.email = 'L’adresse email doit contenir un @.'
  }

  if (!values.password) {
    errors.password = 'Le mot de passe est obligatoire.'
  }

  return errors
}

export function LoginModal({ isOpen, onClose, onSubmit }: LoginModalProps) {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({})

  const errors = useMemo(() => validateLoginForm(formValues), [formValues])
  const isFormValid = Object.keys(errors).length === 0

  if (!isOpen) {
    return null
  }

  function updateField(field: keyof LoginFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  function markFieldAsTouched(field: keyof LoginFormValues) {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }))
  }

  function getErrorMessage(field: keyof LoginFormValues) {
    if (!touchedFields[field]) {
      return null
    }

    return errors[field]
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTouchedFields({
      email: true,
      password: true,
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
            <p className="text-sm font-black uppercase tracking-[0.24em] text-violet">Connexion</p>
            <h2 className="mt-1 text-2xl font-black text-foreground">Se connecter à son compte</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fermer la fenêtre de connexion">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSubmit} noValidate>
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

          <label className="block space-y-2">
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

          <Button type="submit" disabled={!isFormValid} className="w-full">
            <LogIn className="h-5 w-5" />
            Me connecter
          </Button>
        </form>
      </div>
    </div>
  )
}
