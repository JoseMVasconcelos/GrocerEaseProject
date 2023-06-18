import styles from './EditUserDataModal.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { CustomButton } from '../CustomButton'
import { CustomInput } from '../CustomInput'

export function EditUserDataModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            Edite seus dados
          </Dialog.Title>
          <Dialog.Close className={styles.closeButton}>
            <X size={24} />
          </Dialog.Close>
          <form>
            <CustomInput inputType="email" placeholder="Email" isRequired />
            <CustomInput
              inputType="text"
              placeholder="Nome completo"
              isRequired
            />
            <CustomInput inputType="password" placeholder="Senha" isRequired />
            <CustomButton fullWidth>Salvar alterações</CustomButton>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
