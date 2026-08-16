import { CheckCircle2, Circle, Eye, EyeOff, X, UserPlus } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { strongPasswordRules, validateSignupForm } from '@/lib/auth-form-validation-utils'
import type { SignupFormValues } from '@/types/auth'

type SignupModalProps = {
  errorMessage: string | null
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: SignupFormValues) => Promise<boolean>
}

const initialFormValues: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function SignupModal({ errorMessage, isLoading, isOpen, onClose, onSubmit }: SignupModalProps) {
  const [formValues, setFormValues] = useState<SignupFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof SignupFormValues, boolean>>>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

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

  function getLengthErrorMessage(field: keyof SignupFormValues) {
    const errorMessage = errors[field]

    if (!errorMessage?.includes('trop long')) {
      return null
    }

    return errorMessage
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
                placeholder="Ex : Marie"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {(getLengthErrorMessage('firstName') ?? getErrorMessage('firstName')) && (
                <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('firstName') ?? getErrorMessage('firstName')}</p>
              )}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Nom</span>
              <input
                value={formValues.lastName}
                onBlur={() => markFieldAsTouched('lastName')}
                onChange={(event) => updateField('lastName', event.target.value)}
                placeholder="Ex : Dupont"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {(getLengthErrorMessage('lastName') ?? getErrorMessage('lastName')) && (
                <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('lastName') ?? getErrorMessage('lastName')}</p>
              )}
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-black text-foreground">Adresse email</span>
            <input
              value={formValues.email}
              onBlur={() => markFieldAsTouched('email')}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="Ex : marie.dupont@email.com"
              type="email"
              className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
            />
            {(getLengthErrorMessage('email') ?? getErrorMessage('email')) && (
              <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('email') ?? getErrorMessage('email')}</p>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Mot de passe</span>
              <div className="relative">
                <input
                  value={formValues.password}
                  onBlur={() => markFieldAsTouched('password')}
                  onChange={(event) => updateField('password', event.target.value)}
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
              <div className="space-y-1 rounded-2xl bg-muted/40 p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">Le mot de passe doit contenir</p>
                <ul className="space-y-1">
                  {strongPasswordRules.filter((rule) => rule.isVisibleRequirement).map((rule) => {
                    const isRuleValid = rule.isValid(formValues.password)

                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs font-bold transition ${
                          isRuleValid ? 'text-emerald-600' : 'text-muted-foreground'
                        }`}
                      >
                        {isRuleValid ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              </div>
              {(getLengthErrorMessage('password') ?? getErrorMessage('password')) && (
                <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('password') ?? getErrorMessage('password')}</p>
              )}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-black text-foreground">Confirmation</span>
              <div className="relative">
                <input
                  value={formValues.confirmPassword}
                  onBlur={() => markFieldAsTouched('confirmPassword')}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 pr-12 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible((currentValue) => !currentValue)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label={isConfirmPasswordVisible ? 'Masquer la confirmation du mot de passe' : 'Afficher la confirmation du mot de passe'}
                >
                  {isConfirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {getErrorMessage('confirmPassword') && <p className="text-sm font-bold text-red-600">{getErrorMessage('confirmPassword')}</p>}
            </label>
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {errorMessage}
            </p>
          )}

          <Button type="submit" disabled={!isFormValid || isLoading} className="w-full">
            <UserPlus className="h-5 w-5" />
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
        </form>
      </div>
    </div>
  )
}
