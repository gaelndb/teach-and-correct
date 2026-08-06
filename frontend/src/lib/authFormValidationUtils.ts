import type { LoginFormValues, SignupFormValues } from '@/types/auth'

type FormErrors<TFormValues> = Partial<Record<keyof TFormValues, string>>

function validateRequiredField(value: string, message: string) {
  if (!value.trim()) {
    return message
  }

  return undefined
}

function validateEmail(email: string) {
  if (!email.trim()) {
    return 'L’adresse email est obligatoire.'
  }

  if (!email.includes('@')) {
    return 'L’adresse email doit contenir un @.'
  }

  return undefined
}

function validatePassword(password: string) {
  if (!password) {
    return 'Le mot de passe est obligatoire.'
  }

  return undefined
}

export function validateLoginForm(values: LoginFormValues): FormErrors<LoginFormValues> {
  const errors: FormErrors<LoginFormValues> = {}

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validatePassword(values.password)
  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

export function validateSignupForm(values: SignupFormValues): FormErrors<SignupFormValues> {
  const errors: FormErrors<SignupFormValues> = {}

  const firstNameError = validateRequiredField(values.firstName, 'Le prénom est obligatoire.')
  if (firstNameError) {
    errors.firstName = firstNameError
  }

  const lastNameError = validateRequiredField(values.lastName, 'Le nom est obligatoire.')
  if (lastNameError) {
    errors.lastName = lastNameError
  }

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validatePassword(values.password)
  if (passwordError) {
    errors.password = passwordError
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'La confirmation du mot de passe est obligatoire.'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe doivent être identiques.'
  }

  return errors
}
