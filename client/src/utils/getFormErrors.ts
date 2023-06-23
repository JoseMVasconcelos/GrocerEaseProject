import { FieldErrors, FieldValues } from 'react-hook-form'

export function getFormErrors<T extends FieldValues>(errors: FieldErrors<T>) {
  const fieldNamesWithErrors = Object.keys(errors)
  if (fieldNamesWithErrors.length === 0) {
    return undefined
  }

  return fieldNamesWithErrors.map((field) => {
    return errors[field]?.message
  })
}
