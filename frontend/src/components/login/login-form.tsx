import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { validateLoginForm } from '@/lib/auth-form-validation-utils'
import type { LoginFormValues } from '@/types/auth'

type LoginFormProps = {
  errorMessage: string | null
  isLoading: boolean
  onBack: () => void
  onOpenSignup: () => void
  onSubmit: (values: LoginFormValues) => Promise<boolean>
}

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
}

export function LoginForm({ errorMessage, isLoading, onBack, onOpenSignup, onSubmit }: LoginFormProps) {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const errors = useMemo(() => validateLoginForm(formValues), [formValues])
  const isFormValid = Object.keys(errors).length === 0

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
    <section className="relative flex min-h-screen items-start bg-[#fbfaf6] px-6 py-8 sm:py-10 lg:h-screen lg:items-center lg:overflow-y-auto lg:px-10 lg:py-[clamp(0.75rem,1.4vh,2rem)] xl:px-14 [@media_(min-width:1024px)_and_(min-height:900px)]:overflow-hidden">
      <div className="mx-auto w-full max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5f9674] transition hover:text-[#385f49] lg:absolute lg:left-10 lg:top-[clamp(1.5rem,4vh,3rem)] lg:mb-0 xl:left-14"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>

        <div>
          <div className="inline-flex rounded-full border border-[#c7ded4] bg-[#edf5f1] px-4 py-2 text-xs font-black tracking-[0.12em] text-[#5f9674]">
            Connexion à votre espace
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-[-0.045em] text-[#385f49]">Bienvenue !</h1>
          <p className="mt-4 text-lg text-[#7d987f]">Connectez-vous pour accéder à vos copies et vos classes.</p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
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
            {getErrorMessage('email') && <p className="text-sm font-bold text-red-600">{getErrorMessage('email')}</p>}
          </label>

          <label className="block space-y-3">
            <span className="flex items-center justify-between gap-4 text-sm font-black text-[#385f49]">
              Mot de passe
              <button type="button" className="font-semibold text-[#d3634d] transition hover:text-[#c95540]">
                Mot de passe oublié ?
              </button>
            </span>
            <div className="relative">
              <input
                value={formValues.password}
                onBlur={() => markFieldAsTouched('password')}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="Votre mot de passe"
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
            {getErrorMessage('password') && <p className="text-sm font-bold text-red-600">{getErrorMessage('password')}</p>}
          </label>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="h-16 w-full rounded-lg bg-[#d3634d] text-base text-white shadow-none hover:bg-[#c95540]"
          >
            {isLoading ? 'Connexion...' : 'Me connecter'}
          </Button>
        </form>

        <p className="mt-7 text-center text-base font-medium text-[#7d987f]">
          Vous n'avez pas encore de compte ?{' '}
          <button type="button" onClick={onOpenSignup} className="font-black text-[#385f49] transition hover:text-[#d3634d]">
            Créer mon compte gratuitement
          </button>
        </p>
      </div>
    </section>
  )
}
