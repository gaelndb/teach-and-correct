import type { LoginFormValues, SignupFormValues } from '@/types/auth'

type FormErrors<TFormValues> = Partial<Record<keyof TFormValues, string>>

const strongPasswordRules = [
  {
    isValid: (password: string) => Boolean(password),
    message: 'Le mot de passe est obligatoire.',
  },
  {
    isValid: (password: string) => password.length >= 8,
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
  {
    isValid: (password: string) => /[A-Z]/.test(password),
    message: 'Le mot de passe doit contenir au moins une majuscule.',
  },
  {
    isValid: (password: string) => /[a-z]/.test(password),
    message: 'Le mot de passe doit contenir au moins une minuscule.',
  },
  {
    isValid: (password: string) => /[0-9]/.test(password),
    message: 'Le mot de passe doit contenir au moins un chiffre.',
  },
  {
    isValid: (password: string) => /[^A-Za-z0-9]/.test(password),
    message: 'Le mot de passe doit contenir au moins un caractère spécial.',
  },
]

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
