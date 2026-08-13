import { FormEvent, useMemo, useState } from 'react'
import { Eye, EyeOff, LogIn, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { validateLoginForm } from '@/lib/authFormValidationUtils'
import type { LoginFormValues } from '@/types/auth'

type LoginModalProps = {
  errorMessage: string | null
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: LoginFormValues) => Promise<boolean>
}

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
}

export function LoginModal({ errorMessage, isLoading, isOpen, onClose, onSubmit }: LoginModalProps) {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTouchedFields({
      email: true,
      password: true,
    })

    if (!isFormValid) {
      return
    }

    const isSubmitSuccessful = await onSubmit(formValues)

    if (isSubmitSuccessful) {
      setFormValues(initialFormValues)
      setTouchedFields({})
    }
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
            <div className="relative">
              <input
                value={formValues.password}
                onBlur={() => markFieldAsTouched('password')}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="••••••••"
                type={isPasswordVisible ? 'text' : 'password'}
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 pr-12 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {getErrorMessage('password') && <p className="text-sm font-bold text-red-600">{getErrorMessage('password')}</p>}
          </label>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {errorMessage}
            </p>
          )}

          <Button type="submit" disabled={!isFormValid || isLoading} className="w-full">
            <LogIn className="h-5 w-5" />
            {isLoading ? 'Connexion...' : 'Me connecter'}
          </Button>
        </form>
      </div>
    </div>
  )
}
