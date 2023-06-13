import { ReactNode, forwardRef } from 'react'
import styles from './CustomButton.module.css'

interface CustomButtonProps {
  children: ReactNode
  fullWidth: boolean
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  function CustomButton({ children, fullWidth, ...props }, forwardedRef) {
    return (
      <button
        {...props}
        ref={forwardedRef}
        className={
          fullWidth
            ? `${styles.customButton}`
            : `${styles.customButton} ${styles.smallButton}`
        }
      >
        {children}
      </button>
    )
  },
)
