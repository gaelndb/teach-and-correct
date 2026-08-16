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

/**
 * Returns the first validation error found for a field.
 * Useful when a field has several rules and only one message should be displayed.
 */
export function getFirstValidationError(...errors: Array<string | undefined>) {
  return errors.find(Boolean)
}

/**
 * Adds an error message to a form errors object only when a validation failed.
 * This keeps form validators readable by avoiding repeated if blocks.
 */
export function addFormError<TFormValues>(
  errors: FormErrors<TFormValues>,
  field: keyof TFormValues,
  errorMessage?: string,
) {
  if (errorMessage) {
    errors[field] = errorMessage
  }
}
