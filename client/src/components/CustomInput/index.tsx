import styles from './CustomInput.module.css'

interface CustomInputProps {
  inputType: 'text' | 'email' | 'password'
  isRequired: boolean
  placeholder?: string
}

export function CustomInput({
  inputType,
  isRequired,
  placeholder,
}: CustomInputProps) {
  return (
    <input
      type={inputType}
      required={isRequired}
      placeholder={placeholder}
      className={styles.customInput}
    />
  )
}
