import styles from './LogoutModal.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { CustomButton } from '../CustomButton'

export function LogoutModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            Você tem certeza que deseja sair?
          </Dialog.Title>
          <Dialog.Close className={styles.closeButton}>
            <X size={24} />
          </Dialog.Close>
          <div className={styles.buttonsContainer}>
            <Dialog.Close asChild>
              <CustomButton fullWidth={false}>Sim</CustomButton>
            </Dialog.Close>
            <Dialog.Close asChild>
              <CustomButton fullWidth={false}>Não</CustomButton>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
