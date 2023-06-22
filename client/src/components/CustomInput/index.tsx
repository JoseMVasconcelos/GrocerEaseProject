import { forwardRef } from 'react'
import styles from './CustomInput.module.css'

interface CustomInputProps {
  inputType: 'text' | 'email' | 'password'
  isRequired: boolean
  placeholder?: string
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput({ inputType, isRequired, placeholder, ...props }, ref) {
    return (
      <input
        {...props}
        ref={ref}
        type={inputType}
        required={isRequired}
        placeholder={placeholder}
        className={styles.customInput}
      />
    )
  },
)
