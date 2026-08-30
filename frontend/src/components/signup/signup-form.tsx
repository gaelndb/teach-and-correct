import { ArrowLeft, CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { strongPasswordRules, validateSignupForm } from '@/lib/auth-form-validation-utils'
import type { SignupFormValues } from '@/types/auth'

type SignupFormProps = {
  errorMessage: string | null
  isLoading: boolean
  onBack: () => void
  onOpenLogin: () => void
  onSubmit: (values: SignupFormValues) => Promise<boolean>
}

const initialFormValues: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function SignupForm({ errorMessage, isLoading, onBack, onOpenLogin, onSubmit }: SignupFormProps) {
  const [formValues, setFormValues] = useState<SignupFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof SignupFormValues, boolean>>>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [wantsNewsletter, setWantsNewsletter] = useState(false)

  const errors = useMemo(() => validateSignupForm(formValues), [formValues])
  const isFormValid = Object.keys(errors).length === 0

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
      setHasAcceptedTerms(false)
      setWantsNewsletter(false)
    }
  }

  return (
    <section className="flex min-h-screen items-start bg-[#fbfaf6] px-6 py-8 sm:py-10 lg:h-screen lg:overflow-y-auto lg:px-14 lg:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-[#5f9674] transition hover:text-[#385f49] lg:mb-[clamp(3rem,10vh,9rem)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>

        <div>
          <div className="inline-flex rounded-full border border-[#c7ded4] bg-[#edf5f1] px-4 py-2 text-xs font-black tracking-[0.12em] text-[#5f9674]">
            Inscription gratuite · Sans carte bancaire
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-[-0.045em] text-[#385f49]">Créez votre compte</h1>
          <p className="mt-4 text-lg text-[#7d987f]">Rejoignez les enseignants qui récupèrent du temps chaque semaine.</p>
        </div>

        <form className="mt-8 space-y-5 lg:mt-10 lg:space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm font-black text-[#385f49]">Nom</span>
              <input
                value={formValues.lastName}
                onBlur={() => markFieldAsTouched('lastName')}
                onChange={(event) => updateField('lastName', event.target.value)}
                placeholder="Dupont"
                className="h-14 w-full rounded-lg border border-[#c7ded4] bg-[#eef6f2] px-4 text-base font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
              />
              {(getLengthErrorMessage('lastName') ?? getErrorMessage('lastName')) && (
                <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('lastName') ?? getErrorMessage('lastName')}</p>
              )}
            </label>

            <label className="space-y-3">
              <span className="text-sm font-black text-[#385f49]">Prénom</span>
              <input
                value={formValues.firstName}
                onBlur={() => markFieldAsTouched('firstName')}
                onChange={(event) => updateField('firstName', event.target.value)}
                placeholder="Gaëlle"
                className="h-14 w-full rounded-lg border border-[#c7ded4] bg-[#eef6f2] px-4 text-base font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
              />
              {(getLengthErrorMessage('firstName') ?? getErrorMessage('firstName')) && (
                <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('firstName') ?? getErrorMessage('firstName')}</p>
              )}
            </label>
          </div>

          <label className="block space-y-3">
            <span className="text-sm font-black text-[#385f49]">Adresse e-mail</span>
            <input
              value={formValues.email}
              onBlur={() => markFieldAsTouched('email')}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="gaelle.dupont@etablissement.fr"
              type="email"
              className="h-14 w-full rounded-lg border border-[#c7ded4] bg-[#eef6f2] px-4 text-base font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
            />
            {(getLengthErrorMessage('email') ?? getErrorMessage('email')) && (
              <p className="text-sm font-bold text-red-600">{getLengthErrorMessage('email') ?? getErrorMessage('email')}</p>
            )}
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm font-black text-[#385f49]">Mot de passe</span>
              <div className="relative">
                <input
                  value={formValues.password}
                  onBlur={() => markFieldAsTouched('password')}
                  onChange={(event) => updateField('password', event.target.value)}
                  placeholder="8 caractères min."
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="h-14 w-full rounded-lg border border-[#c7ded4] bg-[#eef6f2] px-4 pr-12 text-base font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5f9674] transition hover:text-[#385f49]"
                  aria-label={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="space-y-1 rounded-xl bg-[#edf5f1] p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7d987f]">Le mot de passe doit contenir</p>
                <ul className="space-y-1">
                  {strongPasswordRules.filter((rule) => rule.isVisibleRequirement).map((rule) => {
                    const isRuleValid = rule.isValid(formValues.password)

                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs font-bold transition ${
                          isRuleValid ? 'text-emerald-600' : 'text-[#7d987f]'
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

            <label className="space-y-3">
              <span className="text-sm font-black text-[#385f49]">Confirmation</span>
              <div className="relative">
                <input
                  value={formValues.confirmPassword}
                  onBlur={() => markFieldAsTouched('confirmPassword')}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  placeholder="Répétez le mot de passe"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  className="h-14 w-full rounded-lg border border-[#c7ded4] bg-[#eef6f2] px-4 pr-12 text-base font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15"
                />
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible((currentValue) => !currentValue)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5f9674] transition hover:text-[#385f49]"
                  aria-label={isConfirmPasswordVisible ? 'Masquer la confirmation du mot de passe' : 'Afficher la confirmation du mot de passe'}
                >
                  {isConfirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {getErrorMessage('confirmPassword') && <p className="text-sm font-bold text-red-600">{getErrorMessage('confirmPassword')}</p>}
            </label>
          </div>

          <div className="space-y-4 text-sm font-semibold text-[#58725d]">
            <label className="flex items-start gap-3">
              <input
                checked={hasAcceptedTerms}
                onChange={(event) => setHasAcceptedTerms(event.target.checked)}
                type="checkbox"
                className="mt-0.5 h-5 w-5 rounded border-[#5f9674] text-[#5f9674] accent-[#5f9674]"
              />
              <span>
                J'accepte les <span className="text-[#d3634d]">Conditions Générales d'Utilisation</span> et la{' '}
                <span className="text-[#d3634d]">politique de confidentialité</span> *
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                checked={wantsNewsletter}
                onChange={(event) => setWantsNewsletter(event.target.checked)}
                type="checkbox"
                className="mt-0.5 h-5 w-5 rounded border-[#5f9674] text-[#5f9674] accent-[#5f9674]"
              />
              <span>Recevoir les nouveautés et conseils pour gagner du temps en correction</span>
            </label>
          </div>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || !hasAcceptedTerms || isLoading}
            className="h-16 w-full rounded-lg bg-[#d3634d] text-base text-white shadow-none hover:bg-[#c95540]"
          >
            {isLoading ? 'Création du compte...' : "M'inscrire gratuitement"}
          </Button>
        </form>

        <p className="mt-7 text-center text-base font-medium text-[#7d987f]">
          Vous avez déjà un compte ?{' '}
          <button type="button" onClick={onOpenLogin} className="font-black text-[#385f49] transition hover:text-[#d3634d]">
            Me connecter
          </button>
        </p>
      </div>
    </section>
  )
}
