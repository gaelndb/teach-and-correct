export type FormErrors<TFormValues> = Partial<Record<keyof TFormValues, string>>

export function validateRequiredField(value: string, message: string) {
  if (!value.trim()) {
    return message
  }

  return undefined
}

export function validateMaxLength(value: string, maxLength: number, message: string) {
  if (value.length > maxLength) {
    return message
  }

  return undefined
}

export function getFirstValidationError(...errors: Array<string | undefined>) {
  return errors.find(Boolean)
}

export function addFormError<TFormValues>(
  errors: FormErrors<TFormValues>,
  field: keyof TFormValues,
  errorMessage?: string,
) {
  if (errorMessage) {
    errors[field] = errorMessage
  }
}
