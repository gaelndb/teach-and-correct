import {
  addFormError,
  getFirstValidationError,
  validateMaxLength,
  validateRequiredField,
  type FormErrors,
} from '@/lib/form-utils'
import type { LoginFormValues, SignupFormValues } from '@/types/auth'

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 253
const MAX_PASSWORD_UTF8_BYTES = 72

export const strongPasswordRules = [
  {
    label: 'Mot de passe obligatoire',
    isVisibleRequirement: true,
    isValid: (password: string) => Boolean(password),
    message: 'Le mot de passe est obligatoire.',
  },
  {
    label: 'Au moins 8 caractères',
    isVisibleRequirement: true,
    isValid: (password: string) => password.length >= 8,
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
  {
    label: 'Au moins une majuscule',
    isVisibleRequirement: true,
    isValid: (password: string) => /[A-Z]/.test(password),
    message: 'Le mot de passe doit contenir au moins une majuscule.',
  },
  {
    label: 'Au moins une minuscule',
    isVisibleRequirement: true,
    isValid: (password: string) => /[a-z]/.test(password),
    message: 'Le mot de passe doit contenir au moins une minuscule.',
  },
  {
    label: 'Au moins un chiffre',
    isVisibleRequirement: true,
    isValid: (password: string) => /[0-9]/.test(password),
    message: 'Le mot de passe doit contenir au moins un chiffre.',
  },
  {
    label: 'Au moins un caractère spécial',
    isVisibleRequirement: true,
    isValid: (password: string) => /[^A-Za-z0-9]/.test(password),
    message: 'Le mot de passe doit contenir au moins un caractère spécial.',
  },
  {
    label: 'Longueur maximale acceptée',
    isVisibleRequirement: false,
    isValid: (password: string) => new TextEncoder().encode(password).length <= MAX_PASSWORD_UTF8_BYTES,
    message: 'Le mot de passe est trop long.',
  },
]

function validateEmail(email: string) {
  if (!email.trim()) {
    return 'L’adresse email est obligatoire.'
  }

  const emailLengthError = validateMaxLength(email, MAX_EMAIL_LENGTH, 'L’adresse email est trop longue.')
  if (emailLengthError) {
    return emailLengthError
  }

  if (!email.includes('@')) {
    return 'L’adresse email doit contenir un @.'
  }

  return undefined
}

function validateStrongPassword(password: string) {
  const failedRule = strongPasswordRules.find((rule) => !rule.isValid(password))

  return failedRule?.message
}

function validateConfirmPassword(password: string, confirmPassword: string) {
  if (!confirmPassword) {
    return 'La confirmation du mot de passe est obligatoire.'
  }

  if (password !== confirmPassword) {
    return 'Les mots de passe doivent être identiques.'
  }

  return undefined
}

export function validateLoginForm(values: LoginFormValues): FormErrors<LoginFormValues> {
  const errors: FormErrors<LoginFormValues> = {}

  addFormError(errors, 'email', validateEmail(values.email))
  addFormError(errors, 'password', validateRequiredField(values.password, 'Le mot de passe est obligatoire.'))

  return errors
}

export function validateSignupForm(values: SignupFormValues): FormErrors<SignupFormValues> {
  const errors: FormErrors<SignupFormValues> = {}

  addFormError(
    errors,
    'firstName',
    getFirstValidationError(
      validateRequiredField(values.firstName, 'Le prénom est obligatoire.'),
      validateMaxLength(values.firstName, MAX_NAME_LENGTH, 'Le prénom est trop long.'),
    ),
  )

  addFormError(
    errors,
    'lastName',
    getFirstValidationError(
      validateRequiredField(values.lastName, 'Le nom est obligatoire.'),
      validateMaxLength(values.lastName, MAX_NAME_LENGTH, 'Le nom est trop long.'),
    ),
  )

  addFormError(errors, 'email', validateEmail(values.email))
  addFormError(errors, 'password', validateStrongPassword(values.password))
  addFormError(errors, 'confirmPassword', validateConfirmPassword(values.password, values.confirmPassword))

  return errors
}
