import type { LoginFormValues, SignupFormValues } from '@/types/auth'

type FormErrors<TFormValues> = Partial<Record<keyof TFormValues, string>>

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

function validateRequiredField(value: string, message: string) {
  if (!value.trim()) {
    return message
  }

  return undefined
}

function validateMaxLength(value: string, maxLength: number, message: string) {
  if (value.length > maxLength) {
    return message
  }

  return undefined
}

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

export function validateLoginForm(values: LoginFormValues): FormErrors<LoginFormValues> {
  const errors: FormErrors<LoginFormValues> = {}

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  if (!values.password) {
    errors.password = 'Le mot de passe est obligatoire.'
  }

  return errors
}

export function validateSignupForm(values: SignupFormValues): FormErrors<SignupFormValues> {
  const errors: FormErrors<SignupFormValues> = {}

  const firstNameError =
    validateRequiredField(values.firstName, 'Le prénom est obligatoire.') ??
    validateMaxLength(values.firstName, MAX_NAME_LENGTH, 'Le prénom est trop long.')
  if (firstNameError) {
    errors.firstName = firstNameError
  }

  const lastNameError =
    validateRequiredField(values.lastName, 'Le nom est obligatoire.') ??
    validateMaxLength(values.lastName, MAX_NAME_LENGTH, 'Le nom est trop long.')
  if (lastNameError) {
    errors.lastName = lastNameError
  }

  const emailError = validateEmail(values.email)
  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validateStrongPassword(values.password)
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
